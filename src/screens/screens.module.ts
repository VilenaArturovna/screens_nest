import { Module } from '@nestjs/common';
import { ScreensController } from './screens.controller';
import { ScreensService } from './screens.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScreenEntity} from "./screen.entity";
import {AuthGuard, OwnerGuard} from "../guards";

@Module({
  controllers: [ScreensController],
  providers: [ScreensService, AuthGuard, OwnerGuard],
  imports: [TypeOrmModule.forFeature([ScreenEntity])]
})
export class ScreensModule {}
