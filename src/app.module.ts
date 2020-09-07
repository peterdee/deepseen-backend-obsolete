import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DATABASE_CONNECTION_STRING } from './configuration';
import { SignupModule } from './signup/signup.module';
// import { SigninModule } from './signin/signin.module';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_CONNECTION_STRING),
    SignupModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {};
