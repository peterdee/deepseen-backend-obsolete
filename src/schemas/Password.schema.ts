import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Password extends Document {
  @Prop()
  userId: string;

  @Prop()
  hash: string;

  @Prop({ default: Date.now })
  created: string;

  @Prop({ default: Date.now })
  updated: string;
};

export const PasswordSchema = SchemaFactory.createForClass(Password);
