import ImageController from '@app/core/image/image.controller';
import ImageService from '@app/core/image/image.service';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
// import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads/images`,
      serveRoot: '/static/images',
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export default class ImageModule {}
