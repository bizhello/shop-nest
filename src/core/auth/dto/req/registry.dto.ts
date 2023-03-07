import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { maxLengthWord } from '../../../../common/constants';
import { IUserRegistry } from '../../interfaces/IUserRegistry';

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
