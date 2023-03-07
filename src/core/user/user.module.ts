import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThrottlerGuard } from '@nestjs/throttler';

import { User, userSchema } from '../../schemas/user.schema';
import UserController from './user.controller';
import UserService from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export default class UserModule {}
