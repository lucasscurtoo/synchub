import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganizationDocument = HydratedDocument<Organization>;
@Schema()
export class Organization {
  @Prop({ required: true })
  orgName: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
