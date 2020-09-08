import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Password } from '../schemas/Password.schema';
import { User } from '../schemas/User.schema';

@Injectable()
export class SignupService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Password.name) private passwordModel: Model<Password>,
  ) {}

  /**
   * Create a new User and Password records
   * @param {string} email - email address
   * @param {string} password - plaintext password
   * @returns {Promise<User>}
   */
  async createUser(email: string, password: string): Promise<User> {
    // create a new User record
    const userRecord = new this.userModel({
      email: email.toLowerCase(),
    });

    // hash the password
    const hashedPassword = await hash(password, 10);

    // create a new Passowrd record
    const passwordRecord = new this.passwordModel({
      userId: userRecord._id,
      hash: hashedPassword,
    });

    // store everything  
    await Promise.all([
      userRecord.save(),
      passwordRecord.save(),
    ]);

    return userRecord;
  }

  /**
   * Find an existing user by email
   * @param {string} email - email address
   * @returns {Promise<User|null>} 
   */
  async findExisting(email: string): Promise<User|null> {
    return this.userModel.findOne({ email: email.toLowerCase() });
  }
};
