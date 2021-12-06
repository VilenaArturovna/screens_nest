import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileEntity} from "./file.entity";
import {AuthGuard} from "../guards/auth.guard";

@Module({
  controllers: [FilesController],
  providers: [FilesService, AuthGuard],
  imports: [TypeOrmModule.forFeature([FileEntity])]
})
export class FilesModule {}
