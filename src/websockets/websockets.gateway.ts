import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Server } from 'socket.io';

import events from '../configuration/events';
import { Connection } from './types';
import {
  HTTP_CODES as hc,
  RESPONSE_MESSAGES as rm,
  TOKEN_PROVIDERS as tp,
} from '../configuration';
import { TokenPayload } from '../utilities/types';
import { User } from '../schemas/User.schema';
import { verifyToken } from '../utilities/jwt';

@Injectable()
@WebSocketGateway()
export class WebsocketsGateway {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @WebSocketServer()
  server: Server;

  private connections: Connection[] = [];

  @SubscribeMessage(events.connect)
  handleConnection(@MessageBody() connection: any): void {
    // handle authentication
    connection.on(
      events.authenticate,
      async (token = '') => {
        // check token
        if (!token) {
          return connection.emit(events.authenticate, ({
            info: rm.missingToken,
            status: hc.badRequest,
          }));
        }
        try {
          // decode the token
          const decoded = await verifyToken(token);
          const { id = '', provider = '' }: TokenPayload = decoded;
          if (!(id && provider && Object.values(tp).includes(provider))) {
            return connection.emit(events.authenticate, ({
              info: rm.invalidToken,
              status: hc.badRequest,
            }));
          }

          const user = await this.userModel.findOne({ _id: id });
          if (!user) {
            return connection.emit(events.authenticate, ({
              info: rm.accessDenied,
              status: hc.unauthorized,
            }));
          }
        
          this.connections.push({
            provider,
            socketId: connection.id,
            userId: user._id,
          });

          // update User record: set online status
          await this.userModel.updateOne(
            {
              _id: user._id,
            },
            {
              [`${provider}Online`]: true,
            },
          );

          return connection.emit(events.authenticate, ({
            info: rm.ok,
            status: hc.ok,
          }));
        } catch (error) {
          return connection.emit(events.authenticate, ({
            info: rm.accessDenied,
            status: hc.unauthorized,
          }));
        }
      },
    );

    // handle client disconnection
    connection.on(
      events.disconnect,
      async () => {
        const { provider = '', userId = '' } = this.connections.find(
          ({ socketId = '' }) => socketId === connection.id,
        );
        if (!(provider && userId)) {
          return false;
        }

        // update User record: set online status
        return this.userModel.updateOne(
          {
            _id: userId,
          },
          {
            [`${provider}Online`]: false,
          },
        );
      }
    );
  }
}
