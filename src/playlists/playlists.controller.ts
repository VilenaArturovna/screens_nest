import {Body, Controller, Param, UseGuards} from '@nestjs/common';
import {Crud, CrudController, Override} from "@nestjsx/crud";
import {PlaylistEntity} from "./playlist.entity";
import {PlaylistsService} from "./playlists.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UpdatePlaylistDto} from "./dto/updatePlaylist.dto";
import {AuthGuard} from "../guards/auth.guard";
import {OwnerPlaylistGuard} from "./guards/ownerPlaylist.guard";

@ApiTags('playlists')
@ApiBearerAuth()
@UseGuards(AuthGuard, OwnerPlaylistGuard)
@Crud({
  model: {
    type: PlaylistEntity,
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

  @Override('updateOneBase')
  async updatePlaylist(@Param('id') id: string, @Body() updateDto: UpdatePlaylistDto): Promise<PlaylistEntity> {
    return this.service.updatePlaylist(id, updateDto)
  }
}
