import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  chatId: string;

  @Prop({ type: [{ type: Object, required: true }] })
  messages: {
    message: string;
    sentTime: Date;
    userOwner: string;
  }[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
