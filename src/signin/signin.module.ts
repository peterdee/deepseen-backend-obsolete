import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';

import { Password, PasswordSchema } from '../schemas/Password.schema';
import { User, UserSchema } from '../schemas/User.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Password.name,
      schema: PasswordSchema,
    },
    {
      name: User.name,
      schema: UserSchema,
    },
  ])],
  controllers: [SigninController],
  providers: [SigninService],
})

export class SigninModule {};
