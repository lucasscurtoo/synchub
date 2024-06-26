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

      const createdOrUpdatedMessage = await this.messageModel
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

      if (!createdOrUpdatedMessage) {
        ErrorManager.createSignatureError({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'There was a problem saving the message',
        });
      }

      const lastMessage =
        createdOrUpdatedMessage.messages[
          createdOrUpdatedMessage.messages.length - 1
        ];

      return {
        status: HttpStatus.OK,
        message: 'Message inserted sucsessfull',
        data: {
          _id: createdOrUpdatedMessage._id,
          lastMessage,
        },
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

  async getMessagesByChatId(chatId: string) {
    try {
      if (!chatId) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.BAD_REQUEST,
          message: 'No chat id provided',
        });
      }

      const messages = await this.messageModel
        .findOne({
          chatId,
        })
        .lean();

      if (!messages) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: 'No messages founded',
        });
      }

      return {
        status: HttpStatus.OK,
        message: 'Message returned sucsessfully',
        data: messages,
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

  async editMessage({
    messageId,
    newMessage,
    chatId,
  }: {
    messageId: string;
    newMessage: string;
    chatId: string;
  }) {
    try {
      if (!messageId || !newMessage || !chatId) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.BAD_REQUEST,
          message: 'No enough arguments provided',
        });
      }

      const {
        messages: [oldMessage],
      } = await this.messageModel
        .findOne(
          {
            chatId,
            'messages._id': messageId,
          },
          { 'messages.$': 1 },
        )
        .lean();

      if (!oldMessage) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: 'Message not found',
        });
      }

      const updatedMessage = await this.messageModel
        .findOneAndUpdate(
          { chatId, 'messages._id': messageId },
          { $set: { 'messages.$.message': newMessage } },
          { new: true },
        )
        .lean();

      if (!updatedMessage) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: 'No messages found',
        });
      }

      const {
        messages: [editedMessage],
      } = await this.messageModel
        .findOne(
          {
            chatId,
            'messages._id': messageId,
          },
          { 'messages.$': 1 },
        )
        .lean();

      if (!editedMessage) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: 'Edited message not found',
        });
      }

      return {
        status: HttpStatus.OK,
        message: 'Message edited successfully',
        data: { editedMessage, oldMessage },
      };
    } catch (error) {
      console.log(error);
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

  async deleteMessage({
    messageId,
    chatId,
  }: {
    messageId: string;
    chatId: string;
  }) {
    try {
      if (!messageId || !chatId) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.BAD_REQUEST,
          message: 'No enough arguments provided',
        });
      }

      const {
        messages: [messageToDelete],
      } = await this.messageModel
        .findOne(
          {
            chatId,
            'messages._id': messageId,
          },
          { 'messages.$': 1 },
        )
        .lean();

      const deleteResult = await this.messageModel.updateOne(
        { chatId },
        { $pull: { messages: { _id: messageId } } },
      );

      if (!deleteResult) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: 'No message found',
        });
      }

      return {
        status: HttpStatus.OK,
        message: 'Message deleted successfully',
        data: messageToDelete,
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
