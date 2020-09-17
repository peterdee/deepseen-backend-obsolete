import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
  @Prop()
  email: string;

  @Prop({ default: false })
  desktopOnline: boolean;

  @Prop({ default: false })
  mobileOnline: boolean;

  @Prop({ default: false })
  webOnline: boolean;

  @Prop({ default: Date.now })
  created: string;

  @Prop({ default: Date.now })
  updated: string;
};

export const UserSchema = SchemaFactory.createForClass(User);
