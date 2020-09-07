import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DATABASE_CONNECTION_STRING } from './configuration';
import { SignupController } from './signup/signup.controller';

console.log('asdasdasd', DATABASE_CONNECTION_STRING)

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_CONNECTION_STRING),
  ],
  controllers: [SignupController],
  providers: [],
})

export class AppModule {};
