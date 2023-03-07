import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Token, tokenSchema } from '../../schemas/token.schema';
import TokenService from './token.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: tokenSchema }]),
  ],
  controllers: [],
  providers: [TokenService],
  exports: [TokenService],
})
export default class TokenModule {}
