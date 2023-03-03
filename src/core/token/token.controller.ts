import { Controller, Get, Req, Res } from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

import TokenEnum from '../../common/enums/token';
import ResRefreshDto from './dto/refresh.dto';
import TokenService from './token.service';

@Controller()
export default class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get(TokenEnum.PATH)
  public async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ResRefreshDto> {
    const userInfo = await this.tokenService.refreshToken(
      request.cookies[TokenEnum.REFRESH_TOKEN],
    );
    response.cookie(TokenEnum.REFRESH_TOKEN, userInfo.refreshToken, {
      maxAge: 30 * 24 * 60 * 1000,
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'none',
    });

    return { userId: userInfo.userId, accessToken: userInfo.accessToken };
  }
}
