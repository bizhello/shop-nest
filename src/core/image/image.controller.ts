import ValidateParamIdDto from '@app/common/dto/validate-id.dto';
import { RoutesEnum, TextEnum } from '@app/common/enums';
import ResUploadImage from '@app/core/image/dto/upload-image.response';
import ImageService from '@app/core/image/image.service';
import MFile from '@app/core/image/mfile.class';
import AuthGuard from '@app/guards/auth.guard';
import {
  Controller,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(new AuthGuard())
@Controller(RoutesEnum.IMAGES)
export default class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post(RoutesEnum.BY_ID)
  @HttpCode(200)
  @UseInterceptors(FileInterceptor(TextEnum.IMAGE))
  public async uploadImage(
    @Param() param: ValidateParamIdDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResUploadImage> {
    const buffer = await this.imageService.convertToWebP(file.buffer);
    const newFile = new MFile({
      originalname: `${file.originalname.split('.')[0]}.webp`,
      buffer,
    });

    return this.imageService.uploadImage(param.id, newFile);
  }
}
