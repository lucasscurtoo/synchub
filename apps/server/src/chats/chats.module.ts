import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Chat, ChatSchema } from './chat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { ChatGateway } from './chat.gateway';
import { UsersService } from 'src/users/users.service';
import { MessagesService } from 'src/messages/messages.service';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    UsersModule,
    MessagesModule,
  ],
  providers: [ChatsService, ChatGateway, UsersService, MessagesService],
})
export class ChatsModule {}
