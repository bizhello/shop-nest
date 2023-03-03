import { sign, verify } from 'jsonwebtoken';
import { Types } from 'mongoose';

import TokenEnum from '../common/enums/token';

export function validateAccessToken(accessToken: string): Types.ObjectId {
  try {
    const { userId } = verify(accessToken, process.env.JWT_ACCESS_SECRET);

    return userId;
  } catch (error) {
    return null;
  }
}

export function validateRefreshToken(refreshToken: string): Types.ObjectId {
  try {
    const { userId } = verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    return userId;
  } catch (error) {
    return null;
  }
}

export function generateTokens(userId: Types.ObjectId): {
  accessToken: string;
  refreshToken: string;
} {
  const accessToken = sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: TokenEnum.TOKEN_TIME_ACCESS,
  });

  const refreshToken = sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: TokenEnum.TOKEN_TIME_ACCESS,
  });

  return {
    accessToken,
    refreshToken,
  };
}
