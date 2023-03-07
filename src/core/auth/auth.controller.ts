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
import { Request, Response } from 'express';

import { maxAgeRefreshToken } from '../../common/constants';
import { MessagesEnum, RoutesEnum, TextEnum } from '../../common/enums';
import TokenService from '../token/token.service';
import AuthService from './auth.service';
import ReqLoginDto from './dto/req/login.dto';
import ReqRegistryDto from './dto/req/registry.dto';
import ResLoginDto from './dto/res/login.dto';
import ResRegistryDto from './dto/res/registry.dto';

@Controller()
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post(RoutesEnum.REGISTRY)
  public async register(@Body() dto: ReqRegistryDto): Promise<ResRegistryDto> {
    return this.authService.registry(dto);
  }

  @Post(RoutesEnum.LOGIN)
  public async login(
    @Body() dto: ReqLoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ResLoginDto> {
    const { refreshToken, ...resUser } = await this.authService.login(dto);

    // eslint-disable-next-line no-unused-expressions
    dto.remember &&
      response.cookie(TextEnum.REFRESH_TOKEN, refreshToken, {
        maxAge: maxAgeRefreshToken,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

    return resUser;
  }

  @Get(RoutesEnum.LOGOUT)
  public async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    try {
      const refreshToken: string = request.cookies[TextEnum.REFRESH_TOKEN];
      await this.authService.logout(refreshToken);

      response.clearCookie(TextEnum.REFRESH_TOKEN);

      return { message: MessagesEnum.EXIT };
    } catch (error) {
      throw new HttpException(MessagesEnum.EXIT_REPEAT, HttpStatus.FORBIDDEN);
    }
  }

  @Get(RoutesEnum.REFRESH)
  public async refreshToken(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response<string, Record<string, string>>> {
    const userInfo = await this.tokenService.refreshToken(
      request.cookies[TextEnum.REFRESH_TOKEN],
    );

    response.cookie(TextEnum.REFRESH_TOKEN, userInfo.refreshToken, {
      maxAge: maxAgeRefreshToken,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return response.send({
      userId: userInfo.userId,
      accessToken: userInfo.accessToken,
    });
  }
}
