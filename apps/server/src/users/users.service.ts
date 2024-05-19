import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorManager } from '../services/error.manager';
import { ApiResponse } from 'src/types';
import { v2 as cloudinary } from 'cloudinary';
import { unlinkSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

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

  async findOne(id: string) {
    try {
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid id',
        });
      }
      const user = await this.userModel
        .findById({
          _id: id,
        })
        .lean();

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

  async update(
    id: string,
    file: Express.Multer.File,
    updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse> {
    try {
      const user = await this.userModel.findById({ _id: id });

      if (!user) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: 'No user found',
        });
      }

      if (file) {
        const validTypes = ['image/png', 'image/jpeg'];
        if (!validTypes.includes(file.mimetype)) {
          throw ErrorManager.createSignatureError({
            status: HttpStatus.BAD_REQUEST,
            message: 'Only images files are allowed, provide png or jpeg file',
          });
        }

        if (file.size < 5000000) {
          // Save the uploaded file to a temporary file
          // so that we can upload it to Cloudinary
          const tempFilePath = join(tmpdir(), file.originalname);
          writeFileSync(tempFilePath, file.buffer);

          // Upload the file to Cloudinary
          const result = await cloudinary.uploader.upload(tempFilePath, {
            public_id: file.filename,
            folder: 'profile-pictures',
          });

          updateUserDto.profilePicture = result.url;
          // Delete the temporary file
          unlinkSync(tempFilePath);
        } else {
          throw ErrorManager.createSignatureError({
            status: HttpStatus.BAD_REQUEST,
            message: 'File size is too large',
          });
        }
      }

      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: id },
        updateUserDto,
        { new: true },
      );

      return {
        status: HttpStatus.OK,
        message: 'User updated and returned',
        data: updatedUser,
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
      await this.userModel.deleteOne({ _id: id });

      return {
        status: HttpStatus.OK,
        message: 'User deleted',
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
