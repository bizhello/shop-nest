import { maxLengthWord } from '@app/common/constants';
import { IUserRegistry } from '@app/core/auth/interfaces/IUserRegistry';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export default class ReqRegistryDto implements IUserRegistry {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, maxLengthWord)
  public readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, maxLengthWord)
  public readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, maxLengthWord)
  public readonly lastName: string;
}
