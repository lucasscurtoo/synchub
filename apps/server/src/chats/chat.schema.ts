import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ChatDocument = Document & Chat;

@Schema()
export class Chat {
  @Prop({ type: [{}], required: true })
  participants: [{ type: mongoose.Schema.Types.ObjectId; ref: 'User' }];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message' })
  messageId: mongoose.Schema.Types.ObjectId;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
