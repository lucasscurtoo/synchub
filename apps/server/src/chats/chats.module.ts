import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
// import { ChatsController } from './chats.controller';
import { Chat, ChatSchema } from './chat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    UsersModule,
  ],
  providers: [ChatsService, ChatGateway],
})
export class ChatsModule {}
