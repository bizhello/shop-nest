import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sign, verify } from 'jsonwebtoken';
import { Model } from 'mongoose';

import { MessagesEnum, TokenTimeEnum } from '../../common/enums';
import { Token, TTokenDocument } from '../../schemas/token.schema';
import IRefresh from './interfaces/IRefresh';

@Injectable()
export default class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TTokenDocument>,
  ) {}

  public async refreshToken(refreshToken: string): Promise<IRefresh> {
    if (!refreshToken) {
      throw new HttpException(MessagesEnum.AUTH_ERROR, HttpStatus.FORBIDDEN);
    }
    const userId = this.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.findRefreshToken(refreshToken);
    if (!userId || !tokenFromDb) {
      throw new HttpException(MessagesEnum.AUTH_ERROR, HttpStatus.FORBIDDEN);
    }
    const tokens = this.generateTokens(userId);
    await this.saveToken(userId, tokens.refreshToken);

    return {
      userId,
      ...tokens,
    };
  }

  public async saveToken(userId: string, refreshToken: string): Promise<Token> {
    const tokenData = await this.tokenModel.findOne({ userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }
    const token = await this.tokenModel.create({ userId, refreshToken });

    return token.save();
  }

  public async removeToken(refreshToken: string): Promise<void> {
    const token = await this.tokenModel.deleteOne({ refreshToken });

    if (token.deletedCount === 0) {
      throw new HttpException(MessagesEnum.EXIT_REPEAT, HttpStatus.FORBIDDEN);
    }
  }

  public async findRefreshToken(tokenRefresh: string): Promise<string> {
    try {
      const { refreshToken } = await this.tokenModel.findOne({
        tokenRefresh,
      });
      if (!refreshToken) {
        throw new HttpException(
          MessagesEnum.USER_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }

      return refreshToken;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('НЕТ в БАЗЕ ДАННЫХ');
    }
  }

  public validateRefreshToken(refreshToken: string): string | null {
    try {
      const { userId } = verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      return userId;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('НЕ ВАЛИДНЫЙ РЕФРЕШ ТОКЕН');
    }
  }

  public validateAccessToken(accessToken: string): string | null {
    try {
      const { userId } = verify(accessToken, process.env.JWT_ACCESS_SECRET);

      return userId;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('НЕ ВАЛИДНЫЙ АКСЕСС ТОКЕН');
    }
  }

  public generateTokens(userId: string): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = sign({ userId }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: TokenTimeEnum.ACCESS,
    });

    const refreshToken = sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: TokenTimeEnum.REFRESH,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
