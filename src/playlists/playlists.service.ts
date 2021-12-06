import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {PlaylistEntity} from "./playlist.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PlaylistsService extends TypeOrmCrudService<PlaylistEntity>{
  constructor(@InjectRepository(PlaylistEntity) repo) {
    super(repo);
  }
}
