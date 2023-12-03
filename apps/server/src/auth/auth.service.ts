import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { LoginAuthDto } from './dto/login-auth-dto';
import { CryptoService } from '../crypto/crypto.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly cryptoService: CryptoService,
  ) {}

  async login(loginAuthDto: LoginAuthDto): Promise<User | Error> {
    const user = await this.userModel.findOne({ email: loginAuthDto.email });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const key = Buffer.from(user.key, 'hex'); // Convert the key back to a Buffer
    const decrypted = await this.cryptoService.decrypt(user.password, key);

    if (decrypted !== loginAuthDto.password) {
      throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
    }

    const { ...userObject } = user.toObject();
    return userObject;
  }

  async register(registerAuthDto: RegisterAuthDto): Promise<User | Error> {
    const userExists = await this.userModel.findOne({
      email: registerAuthDto.email,
    });

    if (userExists) {
      throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
    }

    const key = randomBytes(32); // Generate a random 32-byte key
    const encryptedPassword = await this.cryptoService.encrypt(
      registerAuthDto.password,
      key,
    );

    const user = new this.userModel({
      ...registerAuthDto,
      password: encryptedPassword,
      key: key.toString('hex'),
    });
    return user.save();
  }
}
