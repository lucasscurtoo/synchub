import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message, MessageDocument } from './message.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorManager } from 'src/services/error.manager';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async insertMessage({
    chatId,
    message,
    senderId,
  }: {
    chatId: string;
    message: string;
    senderId: string;
  }) {
    try {
      if (!chatId || !message || !senderId) {
        ErrorManager.createSignatureError({
          status: HttpStatus.BAD_REQUEST,
          message: 'Missing required parameters',
        });
      }

      const updatedMessage = await this.messageModel
        .findOneAndUpdate(
          { chatId: chatId }, // search conditions
          {
            $push: {
              messages: {
                message,
                sentTime: new Date(),
                userOwner: senderId,
              },
            },
          }, // update
          { new: true, upsert: true }, // Upsert makes an create if the message doesnt exists, if exists it makes an update
        )
        .lean();

      if (!updatedMessage) {
        ErrorManager.createSignatureError({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'There was a problem saving the message',
        });
      }

      return updatedMessage._id;
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
