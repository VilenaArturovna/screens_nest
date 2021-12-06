import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {FileEntity} from "./file.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {AddFileDto} from "./dto/addFile.dto";

@Injectable()
export class FilesService extends TypeOrmCrudService<FileEntity>{
  constructor(@InjectRepository(FileEntity) repo) {
    super(repo);
  }

  async addFile(addFileDto: AddFileDto): Promise<FileEntity> {
    const file = new FileEntity()
    Object.assign(file, addFileDto)
    file.fileKey = 'https://yandex.ru/'

    return await this.repo.save(file)
  }
}
