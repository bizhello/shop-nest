import TokenService from '@app/core/token/token.service';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Token, tokenSchema } from '@app/schemas/token.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: tokenSchema }]),
  ],
  controllers: [],
  providers: [TokenService],
  exports: [TokenService],
})
export default class TokenModule {}
