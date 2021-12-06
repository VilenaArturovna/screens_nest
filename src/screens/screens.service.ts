import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {ScreenEntity} from "./screen.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ScreensService extends TypeOrmCrudService<ScreenEntity>{
  constructor(@InjectRepository(ScreenEntity) repo) {
    super(repo);
  }
}
