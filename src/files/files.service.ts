import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {FileEntity} from "./file.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class FilesService extends TypeOrmCrudService<FileEntity>{
  constructor(@InjectRepository(FileEntity) repo) {
    super(repo);
  }
}
