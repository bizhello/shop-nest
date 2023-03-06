import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { validateAccessToken } from '../../utils/tokens';

@Injectable()
export default class AuthGuard implements CanActivate {
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;
    let token: string | null;
    if (authorization) {
      // eslint-disable-next-line prefer-destructuring
      token = authorization.split(' ')[1];
    } else {
      token = null;
    }

    const userId = validateAccessToken(token);

    return !!userId;
  }
}
