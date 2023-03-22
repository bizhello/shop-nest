import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export default class ValidateParamIdDto {
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  public readonly id: Types.ObjectId;
}
