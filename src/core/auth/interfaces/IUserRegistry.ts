import { IUserLogin } from '@app/core/auth/interfaces/IUserLogin';

export interface IUserRegistry extends IUserLogin {
  readonly firstName: string;
  readonly lastName: string;
}
