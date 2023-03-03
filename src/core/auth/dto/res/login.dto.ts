import { Types } from 'mongoose';

export default class ResLoginDto {
  public readonly id: Types.ObjectId;

  public readonly email: string;

  public readonly firstName: string;

  public readonly lastName: string;

  public readonly accessToken: string;
}
