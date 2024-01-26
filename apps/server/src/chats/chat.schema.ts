import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
// import { Organization } from 'src/organization.schema';

export type ChatDocument = HydratedDocument<Chat>;
@Schema()
export class Chat {
  @Prop(
    raw({
      files: [
        {
          type: String,
          owner: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
          },
          sentTime: Date,
        },
      ],
    }),
  )
  @Prop(
    raw({
      messages: [
        {
          message: String,
          sentTime: Date,
          owner: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
          },
        },
      ],
    }),
  )
  @Prop({
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
          validator: (value: any[]) => value.length === 2,
          message: 'Debe haber exactamente dos participantes en el chat.',
        },
      },
    ],
  })
  participants: mongoose.Types.ObjectId[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
