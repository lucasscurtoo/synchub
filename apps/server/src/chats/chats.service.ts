import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat, ChatDocument } from './chat.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorManager } from 'src/services/error.manager';
import { User, UserDocument } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';
import { MessagesService } from 'src/messages/messages.service';

interface Client {
  id: string;
  name: string;
  token: string;
}

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private userService: UsersService,
    private messageService: MessagesService,
  ) {}

  private clients: Record<string, Client> = {};

  async onClientConnected(client: Client) {
    this.clients[client.id] = client;
  }

  onClientDisconnected(id: string) {
    delete this.clients[id];
  }

  getClients() {
    return Object.values(this.clients); /* todos los online */
  }

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

  async findAllById(userId: string) {
    try {
      const existingChats = await this.chatModel
        .find({
          participants: { $in: userId },
        })
        .lean()
        .exec();

      if (!existingChats) {
        ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: 'There is no existing chats for the user',
        });
      }
      const chatPartners = existingChats.map((chat) =>
        chat.participants.find(
          (participant) => participant.toString() !== userId,
        ),
      );

      // Calls the userService for every chat that the user has and return an array of users
      const getChatPartnerData = await Promise.all(
        chatPartners.map(async (elem: any) => {
          return await this.userService.findOne(elem);
        }),
      );

      const chatsWithPartnerData = existingChats.map((chat) => {
        const partnerId = chat.participants.find(
          (participant) => participant.toString() !== userId,
        );
        const partnerData = getChatPartnerData.find(
          ({ data }) => data._id.toString() === partnerId.toString(),
        );

        return {
          ...chat,
          partnerData: {
            _id: partnerData.data._id,
            fullName: partnerData.data.fullName,
            profilePicture: partnerData.data.profilePicture,
          },
        };
      });

      return {
        status: HttpStatus.OK,
        message: 'Chats returned',
        data: chatsWithPartnerData,
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

  async insertMessage({ chatId, senderId, receiverId, message }) {
    try {
      if (chatId === 'NEW_CHAT') {
        // First we create a new chat to save the messages in
        const { _id } = await this.chatModel.create({
          participants: [senderId, receiverId],
        });

        // Then we save the message with the ref to the chat (using chatId)
        const updatedMessageId = await this.messageService.insertMessage({
          chatId: _id,
          message,
          senderId,
        });

        // Then we update the property in the chat to link it with the document that has al the messages (messageId)
        const updateChatWithMessageId = await this.chatModel.findOneAndUpdate(
          { _id }, // search conditions
          {
            messageId: updatedMessageId,
          }, // update
          { new: true },
        );

        if (!updateChatWithMessageId) {
          ErrorManager.createSignatureError({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
          });
        }
      } else {
        const updatedMessageId = await this.messageService.insertMessage({
          chatId,
          message,
          senderId,
        });

        const updatedChat = await this.chatModel
          .findOneAndUpdate(
            { _id: chatId }, // search conditions
            {
              messageId: updatedMessageId,
            }, // update
            { new: true }, // Upsert makes an create if the message doesnt exists, if exists it makes an update
          )
          .lean();

        if (!updatedChat) {
          ErrorManager.createSignatureError({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
          });
        }
      }
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
