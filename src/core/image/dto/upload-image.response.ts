import IUploadImage from '../interfaces/IUploadImage';

export default class ResUploadImage implements IUploadImage {
  public readonly url: string;
  public readonly idCard: string;
}
