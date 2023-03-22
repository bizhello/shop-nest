import { Types } from 'mongoose';

interface IUploadImage {
  readonly url: string;
  readonly idCard: Types.ObjectId;
}

export default IUploadImage;
