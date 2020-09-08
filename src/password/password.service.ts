import { compare, hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Password } from '../schemas/Password.schema';

@Injectable()
export class PasswordService {
  constructor(
    @InjectModel(Password.name) private passwordModel: Model<Password>,
  ) {}

  /**
   * Compare password hashes
   * @param {string} password - plaintext password
   * @param {string} hash - hashed password
   * @returns {Promise<boolean>}
   */
  async compareHashes(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }

  /**
   * Find a Password record by User ID
   * @param {string} email - email address
   * @returns {Promise<User|null>} 
   */
  async findPassword(userId: string): Promise<Password|null> {
    return this.passwordModel.findOne({ userId });
  }

  /**
   * Create a password hash
   * @param {string} password - plaintext password
   * @returns {Promise<User>}
   */
  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  /**
   * Update password
   * @param {string} userId - User ID
   * @param {string} hash - new Password hash
   * @returns {Promise<void>} 
   */
  async updatePassword(userId: string, hash: string): Promise<void> {
    return this.passwordModel.updateOne(
      {
        userId,
      },
      {
        hash,
        updated: `${Date.now()}`,
      },
    );
  }
};
