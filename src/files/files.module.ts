import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileEntity} from "./file.entity";
import {AuthGuard} from "../guards/auth.guard";
import {UserEntity} from "../users/user.entity";

@Module({
  controllers: [FilesController],
  providers: [FilesService, AuthGuard],
  imports: [TypeOrmModule.forFeature([FileEntity, UserEntity])]
})
export class FilesModule {}
