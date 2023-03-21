import { maxLengthWord } from '@app/common/constants';
import IChangeUser from '@app/core/user/interfaces/IChangeUser';
import { IsEmail, IsOptional, Length } from 'class-validator';

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
