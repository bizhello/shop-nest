import { IsEmail, IsOptional, Length } from 'class-validator';

import { maxLengthWord } from '../../../../common/constants';
import IChangeUser from '../../interfaces/IChangeUser';

export default class ReqChangeUserDto implements IChangeUser {
  @IsOptional()
  @IsEmail()
  public readonly email?: string;

  @IsOptional()
  @Length(2, maxLengthWord)
  public readonly firstName?: string;

  @IsOptional()
  @Length(2, maxLengthWord)
  public readonly lastName?: string;
}
