import { maxLengthWord } from '@app/common/constants';
import IChangeUser from '@app/core/user/interfaces/IChangeUser';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, Length } from 'class-validator';

export default class ReqChangeUserDto implements IChangeUser {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  public readonly email?: string;

  @ApiProperty()
  @IsOptional()
  @Length(2, maxLengthWord)
  public readonly firstName?: string;

  @ApiProperty()
  @IsOptional()
  @Length(2, maxLengthWord)
  public readonly lastName?: string;
}
