import { Controller } from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {PlaylistEntity} from "./playlist.entity";
import {PlaylistsService} from "./playlists.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UpdatePlaylistDto} from "./dto/updatePlaylist.dto";

@ApiTags('playlists')
@ApiBearerAuth()
@Crud({
  model: {
    type: PlaylistEntity,
  },
  dto: {
    update: UpdatePlaylistDto,
  },
  routes: {
    only: ['getOneBase', 'updateOneBase'],
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@Controller('playlists')
export class PlaylistsController implements CrudController<PlaylistEntity>{
  constructor(public service: PlaylistsService) {
  }
}
