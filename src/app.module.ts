import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DATABASE_CONNECTION_STRING } from './configuration';
import { PasswordModule } from './password/password.module';
import { SignupModule } from './signup/signup.module';
import { SigninModule } from './signin/signin.module';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_CONNECTION_STRING),
    PasswordModule,
    SigninModule,
    SignupModule,
    WebsocketsModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {};
