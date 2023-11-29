import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto): Promise<User | Error> {
    try {
      const usersByEmail = await this.userModel
        .find({ email: createUserDto.email })
        .exec();

      if (usersByEmail.length > 0) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Repetead email, must be unique',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // validar que la organizacion a la que pertenezca exista y eso

      const createdUser = new this.userModel(createUserDto);
      const savedUser = await createdUser.save();

      return savedUser;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
