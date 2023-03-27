import { ErrorsNameEnum, MessagesEnum } from '@app/common/enums';
import IUser from '@app/core/auth/interfaces/IUser';
import ChangeUserDto from '@app/core/user/dto/req/change-user.dto';
import { TUserDocument, User } from '@app/schemas/user.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export default class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<TUserDocument>,
  ) {}

  public async getUsers(): Promise<IUser[]> {
    const users = await this.userModel.find();
    const resUsers = users.map((user) => {
      const { id, email, firstName, lastName } = user;

      return { id, email, firstName, lastName };
    });

    return resUsers;
  }

  public async deleteUser(id: Types.ObjectId): Promise<{ message: string }> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException(
        MessagesEnum.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userModel.deleteOne({ _id: id });

    return { message: MessagesEnum.USER_DELETE };
  }

  public async changeUser(
    userId: Types.ObjectId,
    changeUserDto: ChangeUserDto,
  ): Promise<IUser> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        userId,
        changeUserDto,
        {
          new: true,
          runValidators: true,
        },
      );

      if (!user) {
        throw new HttpException(
          MessagesEnum.USER_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      const { id, email, firstName, lastName } = user;

      return { id, email, firstName, lastName };
    } catch (error) {
      if (error.name === ErrorsNameEnum.MONGO_SERVER) {
        throw new HttpException(
          MessagesEnum.EMAIL_IS_BUSY,
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  public async getUserById(userId: Types.ObjectId): Promise<IUser> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new HttpException(
        MessagesEnum.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    const { id, email, firstName, lastName } = user;

    return { id, email, firstName, lastName };
  }
}
