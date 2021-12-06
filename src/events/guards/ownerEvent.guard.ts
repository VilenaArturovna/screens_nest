import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ExpressRequest} from "../../auth/types";
import {getRepository} from "typeorm";
import {EventEntity} from "../event.entity";

@Injectable()
export class OwnerEventGuard implements CanActivate{
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const eventRepo = getRepository(EventEntity)

    const eventId = request.params.id
    const event = await eventRepo.findOne(eventId, {relations: ['user']})

    if (!eventId || !event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND)
    }

    const userId = request.user.id

    if (event.user.id === userId) {
      return true
    }

    throw new HttpException('You are not owner', HttpStatus.FORBIDDEN)
  }
}
