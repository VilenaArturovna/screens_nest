import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ExpressRequest} from "../../auth/types";
import {getRepository} from "typeorm";
import {ScreenEntity} from "../screen.entity";
import {EventEntity} from "../../events/event.entity";

@Injectable()
export class OwnerScreenGuard implements CanActivate{
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const screenRepo = getRepository(ScreenEntity)
    const eventRepo = getRepository(EventEntity)

    const screenId = request.params.id
    const screen = await screenRepo.findOne(screenId, {relations: ['event']})

    if (!screenId || !screen) {
      throw new HttpException('Screen not found', HttpStatus.NOT_FOUND)
    }

    const user = request.user

    const events = await eventRepo.find({relations: ['user'], where: {user: {id: user.id}}} )
    const eventsIds = events.map(event => event.id)

    if (eventsIds.includes(screen.event.id)) {
      return true
    }

    throw new HttpException('You are not owner', HttpStatus.FORBIDDEN)
  }
}
