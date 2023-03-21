import UserController from '@app/core/user/user.controller';
import UserService from '@app/core/user/user.service';
import { User, userSchema } from '@app/schemas/user.schema';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThrottlerGuard } from '@nestjs/throttler';

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
