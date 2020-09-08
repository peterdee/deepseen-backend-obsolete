import {
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import {
  HTTP_CODES as hc,
  RESPONSE_MESSAGES as rm,
} from '../configuration';
import response from '../utilities/response';
import { ChangePasswordPayload } from './types';
import { PasswordService } from './Password.service';

import { Password } from '../schemas/Password.schema';

@Controller('password')
export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  /**
   * Create a new user
   * @param {ChangePasswordPayload|null} body - request body 
   * @param {*} req - request object 
   * @param {*} res - response object
   * @returns {Promise<void>}
   */
  @Post()
  async handler(
    @Body() body: ChangePasswordPayload | null,
    @Req() req,
    @Res() res,
  ): Promise<void> {
    // check data
    if (!body) {
      return response(req, res, hc.badRequest, rm.missingData);
    }
    const { newPassword = '', oldPassword = '' }: ChangePasswordPayload = body;
    if (!(newPassword && oldPassword)) {
      return response(req, res, hc.badRequest, rm.missingData);
    }
    const trimmedNewPassword = newPassword.trim();
    const trimmedOldPassword = oldPassword.trim();
    if (!(trimmedNewPassword && trimmedOldPassword)) {
      return response(req, res, hc.badRequest, rm.missingData);
    }

    // find the Password record
    const passwordRecord: Password = await this.passwordService.findPassword(req.id);
    if (!passwordRecord) {
      return response(req, res, hc.unauthorized, rm.accessDenied);
    }

    // compare hashes
    const isValid = await this.passwordService.compareHashes(
      trimmedOldPassword,
      passwordRecord.hash,
    );
    if (!isValid) {
      return response(req, res, hc.unauthorized, rm.oldPasswordIsInvalid);
    }

    // hash the new password and update the Password record
    const hashed = await this.passwordService.hashPassword(trimmedNewPassword);
    await this.passwordService.updatePassword(req.id, hashed);

    return response(req, res);
  }
};
