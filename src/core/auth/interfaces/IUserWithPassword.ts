import IUser from '@app/core/auth/interfaces/IUser';

export interface IUserModel extends IUser {
  readonly password: string;
}
