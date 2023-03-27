import { MessagesEnum, RoutesEnum, TextEnum } from '@app/common/enums';
import AuthService from '@app/core/auth/auth.service';
import ReqLoginDto from '@app/core/auth/dto/req/login.dto';
import ReqRegistryDto from '@app/core/auth/dto/req/registry.dto';
import ResLoginDto from '@app/core/auth/dto/res/login.dto';
import ResRegistryDto from '@app/core/auth/dto/res/registry.dto';
import TokenService from '@app/core/token/token.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post(RoutesEnum.REGISTRY)
  @HttpCode(200)
  public async register(@Body() dto: ReqRegistryDto): Promise<ResRegistryDto> {
    return this.authService.registry(dto);
  }

  @Post(RoutesEnum.LOGIN)
  @HttpCode(200)
  public async login(
    @Body() dto: ReqLoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ResLoginDto> {
    const { refreshToken, ...resUser } = await this.authService.login(dto);

    if (dto.remember) {
      response.cookie(TextEnum.REFRESH_TOKEN, refreshToken, {
        maxAge: +process.env.MAX_AGE_REFRESH_TOKEN,
        // httpOnly: true,
        // secure: true,
        // sameSite: 'none',
      });
    }

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
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ userId: string; accessToken: string }> {
    const userInfo = await this.tokenService.refreshToken(
      request.cookies[TextEnum.REFRESH_TOKEN],
    );

    response.cookie(TextEnum.REFRESH_TOKEN, userInfo.refreshToken, {
      maxAge: +process.env.MAX_AGE_REFRESH_TOKEN,
      // httpOnly: true,
      // secure: true,
      // sameSite: 'none',
    });

    return {
      userId: userInfo.userId,
      accessToken: userInfo.accessToken,
    };
  }
}
