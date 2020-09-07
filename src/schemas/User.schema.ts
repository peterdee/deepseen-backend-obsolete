import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  desktopOnline: boolean;

  @Prop()
  mobileOnline: boolean;

  @Prop()
  created: number;

  @Prop()
  updated: number;
};

export const UserSchema = SchemaFactory.createForClass(User);
