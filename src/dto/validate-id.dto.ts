import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export default class ValidateParamIdDto {
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  public readonly id: string;
}
