import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Password extends Document {
  @Prop()
  userId: string;

  @Prop()
  hash: string;

  @Prop()
  created: number;

  @Prop()
  updated: number;
};

export const PasswordSchema = SchemaFactory.createForClass(Password);
