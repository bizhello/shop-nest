import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

import { maxLengthWord } from '../../../../common/constants';
import { IUserLogin } from '../../interfaces/IUserLogin';

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
