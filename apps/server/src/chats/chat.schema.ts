import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;
@Schema()
export class Chat {
  @Prop({ type: [{}], required: true })
  participants: [{ type: mongoose.Schema.Types.ObjectId; ref: 'User' }];
  messages: [{ type: mongoose.Schema.Types.ObjectId; ref: 'Message' }];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
