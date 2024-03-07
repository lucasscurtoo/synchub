import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat, ChatDocument } from './chat.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorManager } from 'src/services/error.manager';
import { User, UserDocument } from 'src/users/user.schema';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  // Injects the Mongoose model for Chat documents into the service using NestJS dependency injection.
  // The model is used to perform operations on the Chat collection in the MongoDB database.

  async create(createChatDto: CreateChatDto) {
    try {
      const chatExists = await this.chatModel
        .exists({ participants: createChatDto.participants })
        .exec();

      if (chatExists) {
        ErrorManager.createSignatureError({
          status: HttpStatus.BAD_REQUEST,
          message: 'Chat already exists',
        });
      }
      // checks if the property participants that we sent exists in users
      const userExists = await this.userModel
        .find({
          _id: { $in: createChatDto.participants },
        })
        .exec();

      if (userExists.length !== createChatDto.participants.length) {
        ErrorManager.createSignatureError({
          status: HttpStatus.BAD_REQUEST,
          message: 'One or more users do not exist',
        });
      }

      const chat = new this.chatModel(createChatDto);
      chat.save();

      return {
        status: HttpStatus.OK,
        message: 'Chat created',
        data: chat,
      };
    } catch (error) {
      return ErrorManager.createSignatureError({
        status: HttpStatus.BAD_REQUEST,
        message: error,
      });
    }
  }

  async findAllById(userId: string) {
    try {
      const existingChats = await this.chatModel
        .exists({
          participants: { $in: userId },
        })
        .exec();

      if (!existingChats) {
        ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: 'There is no existing chats for the user',
        });
      }

      return {
        status: HttpStatus.OK,
        message: 'Chats returned',
        data: existingChats,
      };
    } catch (error) {
      return ErrorManager.createSignatureError({
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid id',
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
