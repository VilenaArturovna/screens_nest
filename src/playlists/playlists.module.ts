import { Module } from '@nestjs/common';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PlaylistEntity} from "./playlist.entity";
import {AuthGuard} from "../guards/auth.guard";

@Module({
  controllers: [PlaylistsController],
  providers: [PlaylistsService, AuthGuard],
  imports: [TypeOrmModule.forFeature([PlaylistEntity])]
})
export class PlaylistsModule {}
