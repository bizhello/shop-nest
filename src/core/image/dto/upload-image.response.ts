import IUploadImage from '@app/core/image/interfaces/IUploadImage';
import { Types } from 'mongoose';

export default class ResUploadImage implements IUploadImage {
  public readonly url: string;

  public readonly idCard: Types.ObjectId;
}
