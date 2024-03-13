import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Organization } from 'src/organization.schema';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop()
  fullName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  status: string;

  @Prop()
  profesionalRole: string;

  @Prop({ default: 'Active' })
  state: string;

  @Prop()
  profilePicture: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Organization' })
  organization: Organization;

  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  iv: string;
  static fullName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
