import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { LoginAuthDto } from './dto/login-auth-dto';
import { CryptoService } from '../services/crypto.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { randomBytes } from 'crypto';
import { ApiResponse } from 'src/types';
import { ErrorManager } from 'src/services/error.manager';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly cryptoService: CryptoService,
  ) {}

  async login(loginAuthDto: LoginAuthDto): Promise<ApiResponse> {
    const user = await this.userModel.findOne({ email: loginAuthDto.email });

    if (!user) {
      ErrorManager.createSignatureError({
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    const key = Buffer.from(user.key, 'hex'); // Convert the key back to a Buffer
    const iv = Buffer.from(user.iv, 'hex');
    console.log(key);
    const decrypted = await this.cryptoService.decrypt(user.password, key, iv);
    console.log(decrypted);

    if (decrypted !== loginAuthDto.password) {
      ErrorManager.createSignatureError({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Wrong password',
      });
    }

    const userWithoutPassword = { ...user.toObject(), password: undefined };

    return {
      status: HttpStatus.OK,
      message: 'Login successful',
      data: userWithoutPassword,
    };
  }

  async register(registerAuthDto: RegisterAuthDto): Promise<ApiResponse> {
    const userExists = await this.userModel.findOne({
      email: registerAuthDto.email,
    });

    if (userExists) {
      ErrorManager.createSignatureError({
        status: HttpStatus.BAD_REQUEST,
        message: 'The user already exists',
      });
    }

    const key = randomBytes(32); // Generate a random 32-byte key
    const { encrypted: encryptedPassword, iv } =
      await this.cryptoService.encrypt(registerAuthDto.password, key);

    const user = new this.userModel({
      ...registerAuthDto,
      password: encryptedPassword,
      key: key.toString('hex'),
      iv, // Store the key as a hex string
    });
    const savedUser = await user.save();

    return {
      status: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: savedUser,
    };
  }
}
