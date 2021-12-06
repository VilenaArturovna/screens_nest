import { Module } from '@nestjs/common';
import { ScreensController } from './screens.controller';
import { ScreensService } from './screens.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScreenEntity} from "./screen.entity";
import {AuthGuard} from "../guards/auth.guard";
import {EventEntity} from "../events/event.entity";
import {PlaylistEntity} from "../playlists/playlist.entity";

@Module({
  controllers: [ScreensController],
  providers: [ScreensService, AuthGuard],
  imports: [TypeOrmModule.forFeature([ScreenEntity, EventEntity, PlaylistEntity])]
})
export class ScreensModule {}
