import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, userSchema } from '../schemas/user.schema';
import TokenModule from '../token/token.module';
import AuthController from './auth.controller';
import AuthService from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export default class AuthModule {}
