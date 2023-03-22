import AppModule from '@app/app.module';
// import corsOptions from '@app/utils/corsOptiopns';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors(corsOptions);
  app.use(cookieParser());
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
