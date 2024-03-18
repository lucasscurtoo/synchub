import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorManager } from '../services/error.manager';
import { ApiResponse } from 'src/types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<ApiResponse> {
    try {
      const users = await this.userModel.find().sort({ fullName: 1 });

      return {
        status: HttpStatus.OK,
        message: 'Users returned',
        data: users,
      };
    } catch (error) {
      throw ErrorManager.createSignatureError({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async findOne(id: string): Promise<ApiResponse> {
    try {
      const user = await this.userModel.findById({
        _id: id,
      });

      if (!user) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: 'Not user found',
        });
      }

      return {
        status: HttpStatus.OK,
        message: 'User returned',
        data: user,
      };
    } catch (error) {
      if (error.message === 'Not user found') {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      } else {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid id',
        });
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<ApiResponse> {
    try {
      const user = await this.userModel.findById({
        _id: id,
      });

      if (!user) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: 'Not user found',
        });
      }

      const update = await this.userModel.findOneAndUpdate(
        { _id: id },
        updateUserDto,
        { new: true },
      );

      return {
        status: HttpStatus.OK,
        message: 'User updated and returned',
        data: update,
      };
    } catch (error) {
      throw ErrorManager.createSignatureError({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Cannot update user',
      });
    }
  }

  async remove(id: string): Promise<ApiResponse> {
    try {
      const user = await this.userModel.findById({
        _id: id,
      });

      if (!user) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        });
      }
      // make the delete from the database
      await this.userModel.deleteOne({ _id: id });

      return {
        status: HttpStatus.OK,
        message: 'User deleted',
      };
    } catch (error) {
      throw ErrorManager.createSignatureError({
        status: HttpStatus.BAD_REQUEST,
        message: error,
      });
    }
  }
}
