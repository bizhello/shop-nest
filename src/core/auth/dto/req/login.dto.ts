import { maxLengthWord } from '@app/common/constants';
import { IUserLogin } from '@app/core/auth/interfaces/IUserLogin';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export default class ReqLoginDto implements IUserLogin {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, maxLengthWord)
  public readonly password: string;

  @IsBoolean()
  public readonly remember?: boolean;
}
