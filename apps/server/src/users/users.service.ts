import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { ErrorManager } from 'src/services/error.manager';

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

      const iv = randomBytes(16);
      const password = createUserDto.password;
      const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
      const cipher = createCipheriv('aes-256-ctr', key, iv);

      const encryptedPassword = Buffer.concat([
        cipher.update(password),
        cipher.final(),
      ]);

      const user = new this.userModel({
        ...createUserDto,
        password: encryptedPassword.toString('hex'),
      });
      return user.save();
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    console.log(id);
    try {
      const user = await this.userModel.findById({
        _id: id,
      });

      return {
        status: HttpStatus.OK,
        message: 'User returned',
        data: user,
      };
    } catch (error) {
      return ErrorManager.createSignatureError({
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid id',
      });
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
