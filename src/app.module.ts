import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import AuthModule from './auth/auth.module';
import CardModule from './card/card.module';
import UserModule from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_MONGO),
    UserModule,
    CardModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
