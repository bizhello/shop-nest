import { MessagesEnum } from '@app/common/enums';
import IUploadImage from '@app/core/image/interfaces/IUploadImage';
import MFile from '@app/core/image/mfile.class';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, remove, writeFile } from 'fs-extra';
import { Types } from 'mongoose';
import * as sharp from 'sharp';

@Injectable()
export default class ImageService {
  public async uploadImage(
    idCard: Types.ObjectId,
    file: MFile,
  ): Promise<IUploadImage> {
    const uploadFolder = `${path}/uploads/images/${idCard}`;
    await ensureDir(uploadFolder);
    await writeFile(`${uploadFolder}/image.webp`, file.buffer);
    const res: IUploadImage = { url: `${idCard}/image.webp`, idCard };

    return res;
  }

  public async convertToWebP(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer).webp().toBuffer();
  }

  public async deleteImage(
    cardId: Types.ObjectId,
  ): Promise<{ cardId: Types.ObjectId }> {
    try {
      await remove(`${path}/uploads/images/${cardId}`);
    } catch (err) {
      throw new HttpException(
        MessagesEnum.IMAGE_NOT_FOUND,
        HttpStatus.CONFLICT,
      );
    }

    return { cardId };
  }
}
