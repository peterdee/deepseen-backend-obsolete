import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import handleAuthenticate from './handlers/authenticate.handler';

@WebSocketGateway()
export class WebsocketsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connect')
  handleConnection(@MessageBody() connection: any): void {
    // handle authentication
    connection.on(
      'authenticate',
      (token = '') => handleAuthenticate(connection, token),
    );

    // handle client disconnection
    connection.on('disconnect', () => {
      console.log('-- disconnect', connection.id);
    });
  }

  // @SubscribeMessage('authenticate')
  // handleAuthenticate(@MessageBody() data: string): any {
  //   console.log('-- authenticate', data);
  //   return this.server.emit('authenticate', ({
  //     info: 'OK',
  //     status: 200,
  //   }));
  // }
}
