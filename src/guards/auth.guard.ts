import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

import { MessagesEnum } from '../common/enums';

@Injectable()
export default class AuthGuard implements CanActivate {
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    let userId = null;
    if (authorization) {
      // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
      const [_, token] = authorization.split(' ');
      try {
        userId = verify(token, process.env.JWT_ACCESS_SECRET);
      } catch (error) {
        throw new HttpException(MessagesEnum.AUTH_ERROR, HttpStatus.FORBIDDEN);
      }
    }

    return !!userId;
  }
}
