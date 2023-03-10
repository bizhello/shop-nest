import { Types } from 'mongoose';

import IUser from '../../../auth/interfaces/IUser';

export default class ResGetUsersDto implements IUser {
  public readonly id: Types.ObjectId;

  public readonly email: string;

  public readonly firstName: string;

  public readonly lastName: string;
}
