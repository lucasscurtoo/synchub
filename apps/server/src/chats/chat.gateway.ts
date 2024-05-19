import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ChatsService } from './chats.service';

@WebSocketGateway({ namespace: '/chats', cors: '*' })
export class ChatGateway
  implements OnModuleInit, OnGatewayInit, OnGatewayConnection
{
  @WebSocketServer()
  public server: Server;

  constructor(private readonly chatService: ChatsService) {}

  onModuleInit() {
    this.server.on('connection', (client: Socket) => {
      const { id, name, token } = client.handshake.auth;

      if (!token) throw Error();
      // validar el token jaja!

      this.chatService.onClientConnected({ id, name, token });
      /* Call service connected socket */

      this.server.emit('on-clients-change', this.chatService.getClients());

      client.on('disconnect', () => {
        this.chatService.onClientDisconnected(client.id);
        this.server.emit('on-clients-changed', this.chatService.getClients());
        /* Call service disconnected socket */
      });
    });
  }

  afterInit() {
    console.log('WebSocket Initialized!');
  }

  handleConnection(client: Socket) {
    const { userId } = client.handshake.auth;
    console.log(`Client connected: ${client.id}`);
    this.handleGetChats(client, userId);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
  async handleGetChats(client: Socket, userId: string) {
    client.emit('chats', await this.chatService.findAllById(userId));
  }

  @SubscribeMessage('chatToServer')
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
    await this.chatService.insertMessage({
      senderId,
      receiverId,
      chatId,
      message,
    });

    client.emit('chatToClient', payload);
  }
}
