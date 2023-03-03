import { Types } from 'mongoose';

export default interface IUser {
  readonly id: Types.ObjectId;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
}
