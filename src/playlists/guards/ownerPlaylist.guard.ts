import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ExpressRequest} from "../../auth/types";
import {getRepository} from "typeorm";
import {PlaylistEntity} from "../playlist.entity";
import {ScreenEntity} from "../../screens/screen.entity";
import {EventEntity} from "../../events/event.entity";

@Injectable()
export class OwnerPlaylistGuard implements CanActivate{
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const playlistsRepo = getRepository(PlaylistEntity)
    const screensRepo = getRepository(ScreenEntity)
    const eventsRepo = getRepository(EventEntity)

    const playlist = await playlistsRepo.findOne(request.params.id, {relations: ['screen']})
    if (!playlist) {
      throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND)
    }

    const screen = await screensRepo.findOne(playlist.screen.id, {relations: ['event']})

    const user = request.user

    const events = await eventsRepo.find({relations: ['user'], where: {user: {id: user.id}}} )
    const eventsIds = events.map(event => event.id)

    if (eventsIds.includes(screen.event.id)) {
      return true
    }

    throw new HttpException('You are not owner', HttpStatus.FORBIDDEN)
  }
}
