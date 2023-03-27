import { maxLengthWord } from '@app/common/constants';
import { IUserRegistry } from '@app/core/auth/interfaces/IUserRegistry';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export default class ReqRegistryDto implements IUserRegistry {
  @ApiProperty({ example: 'admin@mail.ru' })
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
  @IsNotEmpty()
  @IsString()
  @Length(2, maxLengthWord)
  public readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, maxLengthWord)
  public readonly lastName: string;
}
