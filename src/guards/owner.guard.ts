import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('request', request)
    console.log('owner', request.user)
    if (request.params.userId == request.user.id) {
      return true
    }

    throw new HttpException('You are not owner', HttpStatus.FORBIDDEN)
  }
}
