import { IUserLogin } from './IUserLogin';

export interface IUserRegistry extends IUserLogin {
  readonly firstName: string;
  readonly lastName: string;
}
