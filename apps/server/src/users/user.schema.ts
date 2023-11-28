import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Organization } from 'src/organization.schema';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: 'Online' })
  status: string;

  @Prop({ required: true })
  role: string;

  @Prop({ default: false })
  mutedNotifications: boolean;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Organization', required: true })
  organization: Organization;
}

export const UserSchema = SchemaFactory.createForClass(User);
