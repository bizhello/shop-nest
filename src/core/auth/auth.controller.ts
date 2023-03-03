import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

import { maxAgeRefreshToken } from '../../common/constans/maxLengthUser';
import AuthEnum from '../../common/enums/auth';
import AuthService from './auth.service';
import ReqLoginDto from './dto/req/login.dto';
import ReqRegistryDto from './dto/req/registry.dto';
import ResLoginDto from './dto/res/login.dto';
import ResRegistryDto from './dto/res/registry.dto';

@Controller()
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthEnum.PATH_REGISTRY)
  public async register(@Body() dto: ReqRegistryDto): Promise<ResRegistryDto> {
    return this.authService.registry(dto);
  }

  @Post(AuthEnum.PATH_LOGIN)
  public async login(
    @Body() dto: ReqLoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ResLoginDto> {
    const { refreshToken, ...resUser } = await this.authService.login(dto);

    response.cookie(AuthEnum.NAME_REFRESH_TOKEN, refreshToken, {
      maxAge: maxAgeRefreshToken,
      // httpOnly: true,
      // secure: true,
      // sameSite: 'none',
    });

    return resUser;
  }

  @Get(AuthEnum.PATH_LOGOUT)
  public async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    try {
      const refreshToken: string = request.cookies[AuthEnum.NAME_REFRESH_TOKEN];
      await this.authService.logout(refreshToken);

      response.clearCookie(AuthEnum.NAME_REFRESH_TOKEN);

      return { message: AuthEnum.MESSAGE_EXIT };
    } catch (error) {
      throw new HttpException(
        AuthEnum.MESSAGE_EXIT_REPEAT,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
