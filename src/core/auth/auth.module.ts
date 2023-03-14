import AuthController from '@app/core/auth/auth.controller';
import AuthService from '@app/core/auth/auth.service';
import TokenModule from '@app/core/token/token.module';
import { User, userSchema } from '@app/schemas/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export default class AuthModule {}
