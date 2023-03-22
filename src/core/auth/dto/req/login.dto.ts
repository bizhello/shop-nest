import { maxLengthWord } from '@app/common/constants';
import { IUserLogin } from '@app/core/auth/interfaces/IUserLogin';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export default class ReqLoginDto implements IUserLogin {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, maxLengthWord)
  public readonly password: string;

  @ApiProperty()
  @IsBoolean()
  public readonly remember?: boolean;
}
