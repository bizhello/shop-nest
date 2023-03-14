import { Module } from '@nestjs/common';

import AuthModule from './auth/auth.module';
import CardModule from './card/card.module';
import ImageModule from './image/image.module';
import TokenModule from './token/token.module';
import UserModule from './user/user.module';

@Module({
  imports: [AuthModule, CardModule, TokenModule, UserModule, ImageModule],
  exports: [AuthModule, CardModule, TokenModule, UserModule, ImageModule],
})
export default class CoreModule {}
