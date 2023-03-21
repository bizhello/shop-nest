import { MessagesEnum } from '@app/common/enums';
import IExpressRequest from '@app/types/expressRequest.inteface';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export default class AuthGuard implements CanActivate {
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: IExpressRequest = context.switchToHttp().getRequest();

    if (!request.userId) {
      throw new HttpException(MessagesEnum.AUTH_ERROR, HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
