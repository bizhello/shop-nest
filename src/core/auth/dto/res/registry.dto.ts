import { Types } from 'mongoose';

import IUser from '../../interfaces/IUser';

export default class ResRegistryDto implements IUser {
  public readonly id: Types.ObjectId;

  public readonly email: string;

  public readonly firstName: string;

  public readonly lastName: string;
}
