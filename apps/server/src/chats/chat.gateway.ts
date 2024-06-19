import { OnModuleInit, UseFilters } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';
import { MessagesService } from 'src/messages/messages.service';
import { WebSocketExceptionFilter } from 'src/filters/WebSocketExcpetionFilter';

@WebSocketGateway({ namespace: '/chats', cors: '*' })
@UseFilters(WebSocketExceptionFilter)
export class ChatGateway
  implements OnModuleInit, OnGatewayInit, OnGatewayConnection
{
  @WebSocketServer()
  public server: Server;

  constructor(
    private readonly chatService: ChatsService,
    private readonly messagesService: MessagesService,
  ) {}

  private clients: Record<string, any> = [];

  onModuleInit() {
    this.server.on('connection', (client: Socket) => {
      const { id, token } = client.handshake.auth;

      if (!token) throw Error();
      // validar el token!

      if (this.clients[id]) {
        client.disconnect();
      }

      this.clients[id] = client.id;

      this.server.emit('on-clients-change', Object.values(this.clients));

      client.on('disconnect', () => {
        delete this.clients[id];
        this.server.emit('on-clients-changed', Object.values(this.clients));
      });
    });
  }

  afterInit() {
    console.log('WebSocket Initialized!');
  }

  handleConnection(client: Socket) {
    const { id } = client.handshake.auth;
    this.clients[client.id] = id;
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getAllChats')
  async handleGetChats(client: Socket, userId: string) {
    try {
      client.emit('chats', await this.chatService.findAllById(userId));
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('createChatToServer')
  async handleCreateChat(
    client: Socket,
    payload: {
      senderId: string;
      receiverId: string;
      message: string;
    },
  ) {
    try {
      const newChat = await this.chatService.create({
        participants: [payload.senderId, payload.receiverId],
      });
      const insertedMessage = await this.messagesService.insertMessage({
        chatId: newChat.data._id,
        message: payload.message,
        senderId: payload.senderId,
      });
      const updatedChat = await this.chatService.update(newChat.data._id, {
        messageId: insertedMessage.data._id,
      });
      const withPartnerData =
        await this.chatService.findAndReturnWithPartnerData({
          chat: updatedChat,
          userId: payload.senderId,
        });
      client.emit('createChatToClient', withPartnerData);
      client.emit('chatMessageToClient', insertedMessage);
    } catch (error) {
      throw new WsException(error.message);
    }
  }
  @SubscribeMessage('getMessagesToServer')
  async handleGetMessages(
    client: Socket,
    payload: {
      chatId;
    },
  ): Promise<void> {
    try {
      const { chatId } = payload;
      const messages = await this.messagesService.getMessagesByChatId(chatId);
      client.emit('getMessagesToClient', messages);
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('chatMessageToServer')
  async handleMessage(
    client: Socket,
    payload: {
      senderId: string;
      receiverId: string;
      chatId: string;
      message: string;
    },
  ): Promise<void> {
    const { senderId, receiverId, chatId, message } = payload;

    try {
      const insertedMessage = await this.messagesService.insertMessage({
        chatId,
        message,
        senderId,
      });

      client.emit('chatMessageToClient', insertedMessage);
      // This gets the receiver user socketId and use it to send to the client, so the user can see the message
      const receiverSocketId = this.clients[receiverId];
      if (receiverSocketId) {
        this.server
          .to(receiverSocketId)
          .emit('chatMessageToClient', insertedMessage);
      }
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('chatEditMessageToServer')
  async editMessage(
    client: Socket,
    payload: {
      messageId: string;
      newMessage: string;
      chatId: string;
      participants: [];
    },
  ): Promise<void> {
    const { messageId, newMessage, chatId, participants } = payload;

    const editedMessage = await this.messagesService.editMessage({
      messageId,
      newMessage,
      chatId,
    });

    participants.forEach((userId) => {
      const socketId = this.clients[userId];
      if (socketId) {
        this.server.to(socketId).emit('chatEditMessageToClient', editedMessage);
      }
    });
  }
  @SubscribeMessage('chatDeleteMessageToServer')
  async deleteMessage(
    client: Socket,
    payload: {
      messageId: string;
      chatId: string;
      participants: [];
    },
  ): Promise<void> {
    const { messageId, chatId, participants } = payload;

    const deletedMessage = await this.messagesService.deleteMessage({
      messageId,
      chatId,
    });

    participants.forEach((userId) => {
      const socketId = this.clients[userId];
      if (socketId) {
        this.server
          .to(socketId)
          .emit('chatDeleteMessageToClient', deletedMessage);
      }
    });
  }
}
