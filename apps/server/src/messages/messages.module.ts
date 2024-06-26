import { Module } from '@nestjs/common';
import { Message, MessageSchema } from './message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessagesService],
  exports: [MessagesService, MongooseModule],
})
export class MessagesModule {}
