import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Authenticate } from '../middlewares/authenticate.middleware';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { SigninService } from '../signin/signin.service';

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
  controllers: [PasswordController],
  providers: [PasswordService, SigninService],
})

export class PasswordModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Authenticate).forRoutes({
      method: RequestMethod.ALL,
      path: 'password',
    });
  }
};
