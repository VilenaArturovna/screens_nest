import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileEntity} from "./file.entity";
import {AuthGuard, OwnerGuard} from "../guards";

@Module({
  controllers: [FilesController],
  providers: [FilesService, AuthGuard, OwnerGuard],
  imports: [TypeOrmModule.forFeature([FileEntity])]
})
export class FilesModule {}
