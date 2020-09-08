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
import { SignupPayload } from './types';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private signupService: SignupService) {}

  /**
   * Create a new user
   * @param {SignupPayload|null} body - request body 
   * @param {*} req - request object 
   * @param {*} res - response object
   * @returns {Promise<void>}
   */
  @Post()
  async handler(@Body() body: SignupPayload | null, @Req() req, @Res() res): Promise<void> {
    // check data
    if (!body) {
      return response(req, res, hc.badRequest, rm.missingData);
    }
    const { email = '', origin = '', password = '' }: SignupPayload = body;
    if (!(email && password)) {
      return response(req, res, hc.badRequest, rm.missingData);
    }
    const trimmedEmail = email.trim();
    const trimmedOrigin = origin.trim();
    const trimmedPassword = password.trim();
    if (!(trimmedEmail && trimmedPassword)) {
      return response(req, res, hc.badRequest, rm.missingData);
    }

    // check origin
    if (!Object.values(tp).includes(trimmedOrigin)) {
      return response(req, res, hc.unauthorized, rm.accessDenied);
    }

    // check if email address is already in use
    const existing = await this.signupService.findExisting(trimmedEmail);
    if (existing) {
      return response(req, res, hc.badRequest, rm.emailAddressIsAlreadyInUse);
    }

    // create a new User and Password records
    const User = await this.signupService.createUser(trimmedEmail, trimmedPassword);

    // create a new JWT
    const token = await createToken(User._id, trimmedOrigin);

    return response(
      req,
      res,
      hc.ok,
      rm.ok,
      { 
        email: User.email,
        id: User._id,
        token,
      },
    );
  }
};
