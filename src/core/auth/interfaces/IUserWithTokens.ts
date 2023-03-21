import IUser from '@app/core/auth/interfaces/IUser';

export interface IUserWithTokens extends IUser {
  readonly accessToken: string;
  readonly refreshToken: string;
}
