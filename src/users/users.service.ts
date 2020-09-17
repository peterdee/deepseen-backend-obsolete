import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../schemas/User.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Find a User record by ID
   * @param {string} id - User ID
   * @returns {Promise<User|null>} 
   */
  async findUserByID(id: string): Promise<User|null> {
    return this.userModel.findOne({ _id: id });
  }
};
