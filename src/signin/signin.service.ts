import { compare } from 'bcrypt';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Password } from '../schemas/Password.schema';
import { User } from '../schemas/User.schema';
// import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class SigninService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Password.name) private passwordModel: Model<Password>,
  ) {}

  /**
   * Compare password hashes
   * @param {string} hash - hashed password
   * @param {string} password - plaintext password
   * @returns {Promise<boolean>}
   */
  async compareHashes(hash: string, password: string): Promise<boolean> {
    return compare(hash, password);
  }

  /**
   * Find a Password record by email
   * @param {string} email - email address
   * @returns {Promise<User|null>} 
   */
  async findPassword(userId: string): Promise<Password|null> {
    return this.passwordModel.findOne({ userId });
  }

  /**
   * Find a User record by email
   * @param {string} email - email address
   * @returns {Promise<User|null>} 
   */
  async findUser(email: string): Promise<User|null> {
    return this.userModel.findOne({ email: email.toLowerCase() });
  }
};
