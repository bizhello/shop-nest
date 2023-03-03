import IUser from './IUser';

export interface IUserModel extends IUser {
  readonly password: string;
}
