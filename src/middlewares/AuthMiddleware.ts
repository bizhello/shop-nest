import IExpressRequest from '@app/types/expressRequest.inteface';
import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

class AuthMiddleware implements NestMiddleware {
  public use(req: IExpressRequest, _res: Response, next: NextFunction): void {
    if (!req.headers.authorization) {
      req.userId = null;
      next();

      return;
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
      const { userId } = verify(accessToken, process.env.JWT_ACCESS_SECRET);
      req.userId = userId;
      next();
    } catch (error) {
      req.userId = null;
      next();
    }
  }
}

export default AuthMiddleware;
