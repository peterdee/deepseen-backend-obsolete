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
import { SignUpPayload } from './types';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(
    private signupService: SignupService,
  ) {}

  /**
   * Create a new user
   * @param {SignUpPayload|null} body - request body 
   * @param {*} req - request object 
   * @param {*} res - response object
   * @returns {Promise<void>}
   */
  @Post()
  async handler(@Body() body: SignUpPayload | null, @Req() req, @Res() res): Promise<void> {
    // check data
    if (!body) {
      return response(req, res, hc.badRequest, rm.missingData);
    }
    const { email = '', password = '' }: SignUpPayload = body;
    if (!(email && password)) {
      return response(req, res, hc.badRequest, rm.missingData);
    }
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!(trimmedEmail && trimmedPassword)) {
      return response(req, res, hc.badRequest, rm.missingData);
    }

    // check if email address is already in use
    const existing = await this.signupService.findExisting(trimmedEmail);
    if (existing) {
      return response(req, res, hc.badRequest, rm.emailAddressIsAlreadyInUse);
    }

    // create a new User and Password records
    const User = await this.signupService.createUser(email, password);

    // create a new JWT
    const token = await createToken(User._id, tp.web);

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
