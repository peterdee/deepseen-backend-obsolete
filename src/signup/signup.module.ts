import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';

import { Password, PasswordSchema } from '../schemas/Password.schema';
import { User, UserSchema } from '../schemas/User.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema,
    },
    {
      name: Password.name,
      schema: PasswordSchema,
    },
  ])],
  controllers: [SignupController],
  providers: [SignupService],
})

export class SignupModule {};
