import { Injectable, NestMiddleware } from '@nestjs/common';

import {
  HTTP_CODES as hc,
  RESPONSE_MESSAGES as rm,
  TOKEN_PROVIDERS as tp,
} from '../configuration';
import response from '../utilities/response';
import { SigninService } from '../signin/signin.service';
import { TokenPayload } from '../utilities/types';
import { verifyToken } from '../utilities/jwt';

@Injectable()
export class Authenticate implements NestMiddleware {
  constructor(private readonly service: SigninService) {}

  async use(req, res, next) {
    try {
      // check if token is provided
      const { 'x-token': token } = req.headers;
      if (!token) {
        return response(req, res, hc.unauthorized, rm.missingToken);
      }

      // decode the token
      const decoded = await verifyToken(token);
      const { id = '', provider = '' }: TokenPayload = decoded;
      if (!(id && provider && Object.values(tp).includes(provider))) {
        return response(req, res, hc.unauthorized, rm.accessDenied);
      }

      // find User record
      const user = await this.service.findUserByID(`${id}`);
      if (!user) {
        return response(req, res, hc.unauthorized, rm.accessDenied);
      }
      
      // proceed
      req.id = user._id;
      req.user =  user;
      return next();
    } catch {
      return response(req, res, hc.unauthorized, rm.accessDenied);
    }
  }
};
