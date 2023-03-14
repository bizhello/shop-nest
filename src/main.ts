import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import AppModule from './app.module';

if (!process.env.IS_TS_NODE) {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  require('module-alias/register');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
