import AuthModule from '@app/core/auth/auth.module';
import CardModule from '@app/core/card/card.module';
import TokenModule from '@app/core/token/token.module';
import UserModule from '@app/core/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, CardModule, TokenModule, UserModule],
  exports: [AuthModule, CardModule, TokenModule, UserModule],
})
export default class CoreModule {}
