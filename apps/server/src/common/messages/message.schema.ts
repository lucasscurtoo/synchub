import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;
@Schema()
export class Message {
  @Prop(
    raw({
      owner: mongoose.Schema.Types.ObjectId,
      messages: [
        {
          message: { type: String },
          sentTime: { type: Date },
          userOwner: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
          },
        },
      ],
    }),
  )
  messages: Record<string, any>;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
