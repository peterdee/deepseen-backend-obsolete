import {
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import { HTTP_CODES as hc, RESPONSE_MESSAGES as rm } from '../configuration';
import response from '../utilities/response';
import { SignUpPayload } from './types';

@Controller('signup')
export class SignupController {
  @Post()
  handler(@Body() body: SignUpPayload, @Req() req, @Res() res): void {
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

    return response(req, res);
  }
};
