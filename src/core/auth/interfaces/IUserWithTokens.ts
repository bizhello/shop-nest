import IUser from './IUser';

export interface IUserWithTokens extends IUser {
  readonly accessToken: string;
  readonly refreshToken: string;
}
