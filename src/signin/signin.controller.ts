import {
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import { createToken } from '../utilities/jwt';
import {
  HTTP_CODES as hc,
  RESPONSE_MESSAGES as rm,
  TOKEN_PROVIDERS as tp,
} from '../configuration';
import response from '../utilities/response';
import { SigninPayload } from './types';
import { SigninService } from './signin.service';

import { Password } from '../schemas/Password.schema';
import { User } from '../schemas/User.schema';

@Controller('signin')
export class SigninController {
  constructor(private signinService: SigninService) {}

  /**
   * Create a new user
   * @param {SigninPayload|null} body - request body 
   * @param {*} req - request object 
   * @param {*} res - response object
   * @returns {Promise<void>}
   */
  @Post()
  async handler(@Body() body: SigninPayload | null, @Req() req, @Res() res): Promise<void> {
    // check data
    if (!body) {
      return response(req, res, hc.badRequest, rm.missingData);
    }
    const { email = '', origin = '', password = '' }: SigninPayload = body;
    if (!(email && origin && password)) {
      return response(req, res, hc.badRequest, rm.missingData);
    }
    const trimmedEmail = email.trim();
    const trimmedOrigin = origin.trim();
    const trimmedPassword = password.trim();
    if (!(trimmedEmail && trimmedOrigin && trimmedPassword)) {
      return response(req, res, hc.badRequest, rm.missingData);
    }

    // check origin
    if (!Object.values(tp).includes(trimmedOrigin)) {
      return response(req, res, hc.unauthorized, rm.accessDenied);
    }

    // find the User record
    const userRecord: User = await this.signinService.findUser(trimmedEmail);
    if (!userRecord) {
      return response(req, res, hc.unauthorized, rm.accessDenied);
    }

    // find the Password record
    const passwordRecord: Password = await this.signinService.findPassword(userRecord._id);
    if (!passwordRecord) {
      return response(req, res, hc.unauthorized, rm.accessDenied);
    }

    // compare hashes
    const isValid = await this.signinService.compareHashes(passwordRecord.hash, trimmedPassword);
    if (!isValid) {
      return response(req, res, hc.unauthorized, rm.accessDenied);
    }

    // create a new JWT
    const token = await createToken(userRecord._id, trimmedOrigin);

    return response(
      req,
      res,
      hc.ok,
      rm.ok,
      { 
        email: userRecord.email,
        id: userRecord._id,
        token,
      },
    );
  }
};
