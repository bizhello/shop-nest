import { MessagesEnum } from '@app/common/enums';
import IRefresh from '@app/core/token/interfaces/IRefresh';
import { Token, TTokenDocument } from '@app/schemas/token.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sign, verify } from 'jsonwebtoken';
import { Model } from 'mongoose';

@Injectable()
export default class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TTokenDocument>,
  ) {}

  public async refreshToken(
    refreshToken: string | undefined,
  ): Promise<IRefresh> {
    if (!refreshToken) {
      throw new HttpException(MessagesEnum.AUTH_ERROR, HttpStatus.UNAUTHORIZED);
    }
    const userId = this.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.findRefreshToken(refreshToken);
    if (!userId || !tokenFromDb) {
      throw new HttpException(MessagesEnum.AUTH_ERROR, HttpStatus.UNAUTHORIZED);
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
      throw new HttpException(
        MessagesEnum.EXIT_REPEAT,
        HttpStatus.UNAUTHORIZED,
      );
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
      throw new HttpException(
        MessagesEnum.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public validateRefreshToken(refreshToken: string): string | null {
    try {
      const { userId } = verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      return userId;
    } catch (error) {
      throw new HttpException(
        MessagesEnum.TOKEN_NOT_VALID,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public validateAccessToken(accessToken: string): string | null {
    try {
      const { userId } = verify(accessToken, process.env.JWT_ACCESS_SECRET);

      return userId;
    } catch (error) {
      throw new HttpException(
        MessagesEnum.TOKEN_NOT_VALID,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  public generateTokens(userId: string): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = sign({ userId }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.TOKEN_TIME_ACCESS,
    });

    const refreshToken = sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.TOKEN_TIME_REFRESH,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
