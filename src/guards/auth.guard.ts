import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import IExpressRequest from '../types/expressRequest.inteface';

@Injectable()
export default class AuthGuard implements CanActivate {
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: IExpressRequest = context.switchToHttp().getRequest();

    if (!request.userId) {
      throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
