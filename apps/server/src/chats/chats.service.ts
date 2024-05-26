import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Chat, ChatDocument } from './chat.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorManager } from 'src/services/error.manager';
import { User, UserDocument } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';

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

  async create({ participants }) {
    try {
      const chatExists = await this.chatModel
        .exists({ participants: participants })
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
          _id: { $in: participants },
        })
        .exec();

      if (userExists.length !== participants.length) {
        ErrorManager.createSignatureError({
          status: HttpStatus.BAD_REQUEST,
          message: 'One or more users do not exist',
        });
      }

      const chat = await this.chatModel.create({
        participants: participants,
      });

      return {
        status: HttpStatus.OK,
        message: 'Chat created',
        data: chat.toObject(),
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

  async findAndReturnWithPartnerData({ chat, userId }) {
    try {
      if (!chat) {
        ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: 'There is no existing chats for the user',
        });
      }

      const chatWithPartnerData = async () => {
        const partnerId = chat.data.participants.find(
          (participant) => participant.toString() !== userId,
        );
        const getPartnerData = await this.userService.findOne(partnerId);

        const partnerData = getPartnerData.data;

        if (partnerData._id.toString() === partnerId.toString()) {
          return {
            ...chat.data,
            partnerData: {
              _id: partnerData._id,
              fullName: partnerData.fullName,
              profilePicture: partnerData.profilePicture,
            },
          };
        }
      };
      const withPartnerData = await chatWithPartnerData();
      return {
        status: HttpStatus.OK,
        message: 'Chat with partner data',
        data: withPartnerData,
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

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  async update(id: string, toUpdate) {
    try {
      const chatExists = await this.chatModel.findById(id);

      if (!chatExists) {
        ErrorManager.createSignatureError({
          status: HttpStatus.NOT_FOUND,
          message: 'Chat not founded, invalid id',
        });
      }
      const updatedChat = await this.chatModel
        .findByIdAndUpdate(id, toUpdate, {
          new: true,
        })
        .lean();

      if (!updatedChat) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        });
      }

      return {
        status: HttpStatus.OK,
        message: 'Chat created',
        data: updatedChat,
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

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
