import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThrottlerModule } from '@nestjs/throttler';

import CoreModule from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_MONGO),
    CoreModule,
    ThrottlerModule.forRoot({
      ttl: +process.env.RATE_LIMITING_TTL,
      limit: +process.env.RATE_LIMITING_LIMIT,
    }),
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
