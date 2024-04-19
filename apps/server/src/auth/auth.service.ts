import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { LoginAuthDto } from './dto/login-auth-dto';
import { CryptoService } from '../services/crypto.service';
import { randomBytes } from 'crypto';
import { ApiResponse } from 'src/types';
import { ErrorManager } from '../services/error.manager';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly cryptoService: CryptoService,
  ) {}

  async login(loginAuthDto: LoginAuthDto): Promise<ApiResponse> {
    console.log('loginAuthDto', loginAuthDto);
    try {
      const user = await this.userModel.findOne({ email: loginAuthDto.email });

      if (!user) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        });
      }

      const decryptedPassword = await this.cryptoService.decrypt(
        user.password,
        Buffer.from(user.key, 'hex'),
        Buffer.from(user.iv, 'hex'),
      );

      if (loginAuthDto.password !== decryptedPassword) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Wrong password',
        });
      }

      return {
        status: HttpStatus.OK,
        message: 'Login successful',
        data: { id: user.toObject()._id },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        });
      }
    }
  }

  async register(registerAuthDto: RegisterAuthDto): Promise<ApiResponse> {
    try {
      const userExists = await this.userModel.findOne({
        email: registerAuthDto.email,
      });

      if (userExists) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.BAD_REQUEST,
          message: 'The user already exists',
        });
      }

      const key = randomBytes(32); // Generate a random 32-byte key
      const { encrypted: encryptedPassword, iv } =
        await this.cryptoService.encrypt(registerAuthDto.password, key);

      const savedUser = await this.userModel.create({
        ...registerAuthDto,
        password: encryptedPassword,
        key: key.toString('hex'),
        iv, // Store the key as a hex string
      });
      return {
        status: HttpStatus.CREATED,
        message: 'User registered successfully',
        data: { id: savedUser.id },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        });
      }
    }
  }
}
