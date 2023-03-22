import IUploadImage from '@app/core/image/interfaces/IUploadImage';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export default class ResUploadImage implements IUploadImage {
  @ApiProperty()
  public readonly url: string;

  @ApiProperty()
  public readonly idCard: Types.ObjectId;
}
