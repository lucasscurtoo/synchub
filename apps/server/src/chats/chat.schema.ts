import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
// import { Organization } from 'src/organization.schema';

export type ChatDocument = HydratedDocument<Chat>;
@Schema()
export class Chat {
  @Prop({ type: [{}], required: true })
  participants: [{ type: mongoose.Schema.Types.ObjectId; ref: 'User' }];

  // @Prop({type: [{}], required: true})
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
