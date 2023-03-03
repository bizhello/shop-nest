import { Types } from 'mongoose';

export default class ResRefreshDto {
  public readonly userId: Types.ObjectId;
  public readonly accessToken: string;
}
