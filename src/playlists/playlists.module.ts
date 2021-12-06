import { Module } from '@nestjs/common';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PlaylistEntity} from "./playlist.entity";
import {AuthGuard, OwnerGuard} from "../guards";

@Module({
  controllers: [PlaylistsController],
  providers: [PlaylistsService, AuthGuard, OwnerGuard],
  imports: [TypeOrmModule.forFeature([PlaylistEntity])]
})
export class PlaylistsModule {}
