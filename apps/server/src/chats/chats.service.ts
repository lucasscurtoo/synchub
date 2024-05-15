import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat, ChatDocument } from './chat.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorManager } from 'src/services/error.manager';
import { User, UserDocument } from 'src/users/user.schema';

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
      return ErrorManager.createSignatureError({
        status: HttpStatus.BAD_REQUEST,
        message: error,
      });
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
      const chatPartner = existingChats
        .map((chat) =>
          chat.participants.find(
            (participant) => participant.toString() !== userId,
          ),
        )
        .join(', ');

      const getChatPartnersData = await this.userModel
        .find({
          _id: chatPartner,
        })
        .lean();

      const chatsWithPartnerData = existingChats.map((chat) => {
        const partnerId = chat.participants.find(
          (participant) => participant.toString() !== userId,
        );
        const partnerData = getChatPartnersData.find(
          ({ _id }) => _id.toString() === partnerId.toString(),
        );

        return {
          ...chat,
          partnerData: {
            fullName: partnerData.fullName,
            profilePicture: partnerData.profilePicture,
          },
        };
      });

      return {
        status: HttpStatus.OK,
        message: 'Chats returned',
        data: chatsWithPartnerData,
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
