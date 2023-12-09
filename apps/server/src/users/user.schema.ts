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

  @Prop({ default: 'Online' })
  status: string;

  @Prop()
  role: string;

  @Prop({ default: false })
  mutedNotifications: boolean;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Organization' })
  organization: Organization;

  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  iv: string;
  static fullName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
