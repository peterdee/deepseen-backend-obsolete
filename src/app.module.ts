import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DATABASE_CONNECTION_STRING } from './configuration';
import { SignupModule } from './signup/signup.module';
import { SigninController } from './signin/signin.controller';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_CONNECTION_STRING),
    SignupModule,
  ],
  controllers: [SigninController],
  providers: [],
})

export class AppModule {};
