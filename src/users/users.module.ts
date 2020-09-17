import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';

import { Password, PasswordSchema } from '../schemas/Password.schema';
import { User, UserSchema } from '../schemas/User.schema';

@Module({
  controllers: [],
  exports: [UsersService],
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
  providers: [UsersService],
})
export class UsersModule {};
