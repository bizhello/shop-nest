/* eslint-disable @typescript-eslint/naming-convention */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import IUser from '../auth/interfaces/IUser';
import UserEnum from '../../common/enums/user';
import { TUserDocument, User } from '../../schemas/user.schema';
import ChangeUserDto from './dto/req/change-user.dto';

@Injectable()
export default class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<TUserDocument>,
  ) {}

  public async getUsers(): Promise<IUser[]> {
    const users = await this.userModel.find();
    const resUsers = await users.map((user) => {
      const { _id, email, firstName, lastName } = user;

      return { id: _id, email, firstName, lastName };
    });

    return resUsers;
  }

  public async deleteUser(id: string): Promise<{ message: string }> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException(
        UserEnum.ERROR_USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userModel.deleteOne({ _id: id });

    return { message: UserEnum.MESSAGE_USER_DELETE };
  }

  public async changeUser(
    id: string,
    changeUserDto: ChangeUserDto,
  ): Promise<IUser> {
    const user = await this.userModel.findByIdAndUpdate(id, changeUserDto, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new HttpException(
        UserEnum.ERROR_USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    const { _id, email, firstName, lastName } = user;

    return { id: _id, email, firstName, lastName };
  }
}
