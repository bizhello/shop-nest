import { Injectable } from '@nestjs/common';
import IUploadImage from './interfaces/IUploadImage';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export default class ImageService {
  // constructor(private readonly)

  public async uploadImage(
    idCard: string,
    file: Express.Multer.File,
  ): Promise<IUploadImage> {
    const uploadFolder = `${path}/uploads/images/${idCard}`;
    await ensureDir(uploadFolder);
    await writeFile(`${uploadFolder}/image`, file.buffer);

    return { url: uploadFolder, idCard };
  }
}
