import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

import { Password, PasswordSchema } from '../schemas/Password.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Password.name,
      schema: PasswordSchema,
    },
  ])],
  controllers: [PasswordController],
  providers: [PasswordService],
})

export class PasswordModule {};
