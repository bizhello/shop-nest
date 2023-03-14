import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import ValidateParamIdDto from 'src/common/dto/validate-id.dto';
import { RoutesEnum, TextEnum } from 'src/common/enums';
import ResUploadImage from './dto/upload-image.response';
import ImageService from './image.service';

@Controller(RoutesEnum.IMAGES)
export default class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post(RoutesEnum.BY_ID)
  @UseInterceptors(FileInterceptor(TextEnum.IMAGE))
  public async uploadImage(
    @Param() param: ValidateParamIdDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResUploadImage> {
    return this.imageService.uploadImage(param.id, file);
  }
}
