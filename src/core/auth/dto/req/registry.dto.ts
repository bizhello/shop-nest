import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { IUserRegistry } from '../../interfaces/IUserRegistry';
import { maxLength } from '../../../../common/constans/maxLengthUser';

export default class ReqRegistryDto implements IUserRegistry {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, maxLength)
  public readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, maxLength)
  public readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, maxLength)
  public readonly lastName: string;
}
