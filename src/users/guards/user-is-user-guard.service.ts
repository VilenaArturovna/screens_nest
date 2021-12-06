import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserIsUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.params.id == request.user.id) {
      return true
    }

    throw new HttpException('You are not owner', HttpStatus.FORBIDDEN)
  }
}
