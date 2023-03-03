import { IsEmail, IsOptional, Length } from 'class-validator';

import { maxLength } from '../../../../common/constans/maxLengthUser';
import { IChangeUser } from '../../interfaces/IChangeUser';

export default class ReqChangeUserDto implements IChangeUser {
  @IsOptional()
  @IsEmail()
  public readonly email?: string;

  @IsOptional()
  @Length(2, maxLength)
  public readonly firstName?: string;

  @IsOptional()
  @Length(2, maxLength)
  public readonly lastName?: string;
}
