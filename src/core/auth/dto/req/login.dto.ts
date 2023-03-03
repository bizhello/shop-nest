import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { IUserLogin } from '../../interfaces/IUserLogin';
import { maxLength } from '../../../../common/constans/maxLengthUser';

export default class ReqLoginDto implements IUserLogin {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, maxLength)
  public readonly password: string;
}
