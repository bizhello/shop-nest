import { Types } from 'mongoose';

export interface IRefresh {
  readonly userId: Types.ObjectId;
  readonly accessToken: string;
  readonly refreshToken: string;
}
