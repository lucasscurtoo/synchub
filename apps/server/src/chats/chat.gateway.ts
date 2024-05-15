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

      console.log('Connected');
      // if (!token) throw Error();

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
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('chatToClient', payload);
  }
}
