import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import Token, { tokenSchema } from '../schemas/token.schema';
import TokenController from './token.controller';
import TokenService from './token.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: tokenSchema }]),
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export default class TokenModule {}
