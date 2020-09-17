import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../schemas/User.schema';
import { WebsocketsGateway } from './websockets.gateway';

@Module({
  controllers: [],
  imports: [MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema,
    },
  ])],
  providers: [WebsocketsGateway],
})
export class WebsocketsModule {}
