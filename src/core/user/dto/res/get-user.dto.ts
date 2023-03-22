import IUser from '@app/core/auth/interfaces/IUser';
import { Types } from 'mongoose';

export default class ResGetUsersDto implements IUser {
  public readonly id: Types.ObjectId;

  public readonly email: string;

  public readonly firstName: string;

  public readonly lastName: string;
}
