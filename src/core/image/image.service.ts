import IUploadImage from '@app/core/image/interfaces/IUploadImage';
import MFile from '@app/core/image/mfile.class';
import { Injectable } from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { path } from 'app-root-path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ensureDir, writeFile } from 'fs-extra';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as sharp from 'sharp';

@Injectable()
export default class ImageService {
  public async uploadImage(idCard: string, file: MFile): Promise<IUploadImage> {
    const uploadFolder = `${path}/uploads/images/${idCard}`;
    await ensureDir(uploadFolder);
    await writeFile(`${uploadFolder}/image.webp`, file.buffer);
    const res: IUploadImage = { url: `${idCard}/image.webp`, idCard };

    return res;
  }

  public async convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
