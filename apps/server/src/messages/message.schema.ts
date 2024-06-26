import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  chatId: string;

  @Prop({
    type: [
      {
        _id: {
          type: MongooseSchema.Types.ObjectId,
          required: true,
          auto: true,
        },
        message: { type: String, required: true },
        sentTime: { type: Date, required: true },
        userOwner: { type: String, required: true },
      },
    ],
    required: true,
  })
  messages: {
    _id: MongooseSchema.Types.ObjectId;
    message: string;
    sentTime: Date;
    userOwner: string;
  }[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
