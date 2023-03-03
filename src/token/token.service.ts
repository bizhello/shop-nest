import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import AuthEnum from '../common/enums/auth';
import TokenEnum from '../common/enums/token';
import Token, { TTokenDocument } from '../schemas/token.schema';
import { generateTokens, validateRefreshToken } from '../utils/tokens';
import { IRefresh } from './interfaces/IRefresh';

@Injectable()
export default class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TTokenDocument>,
  ) {}

  public async refreshToken(refreshToken: string): Promise<IRefresh> {
    if (!refreshToken) {
      throw new HttpException(TokenEnum.AUTH_ERROR, HttpStatus.UNAUTHORIZED);
    }
    const userId = validateRefreshToken(refreshToken);
    const tokenFromDb = await this.findRefreshToken(refreshToken);

    if (!userId || !tokenFromDb) {
      throw new HttpException(TokenEnum.AUTH_ERROR, HttpStatus.UNAUTHORIZED);
    }
    const tokens = generateTokens(userId);
    await this.saveToken(userId, tokens.refreshToken);

    return {
      userId,
      ...tokens,
    };
  }

  public async saveToken(
    userId: Types.ObjectId,
    refreshToken: string,
  ): Promise<Token> {
    const tokenData = await this.tokenModel.findOne({ userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }

    await this.tokenModel.create({ userId, refreshToken });
  }

  public async removeToken(refreshToken: string): Promise<void> {
    const token = await this.tokenModel.deleteOne({ refreshToken });

    if (token.deletedCount === 0) {
      throw new HttpException(
        AuthEnum.MESSAGE_EXIT_REPEAT,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  public async findRefreshToken(refreshToken: string): Promise<Token> {
    const tokenData = await this.tokenModel.findOne({ refreshToken });

    return tokenData;
  }
}
