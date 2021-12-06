import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {ScreenEntity} from "./screen.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {EventEntity} from "../events/event.entity";
import {Repository} from "typeorm";
import {CreateScreenDto} from "./dto/createScreen.dto";

@Injectable()
export class ScreensService extends TypeOrmCrudService<ScreenEntity>{
  constructor(@InjectRepository(ScreenEntity) repo,
              @InjectRepository(EventEntity) private readonly eventRepo: Repository<EventEntity>) {
    super(repo);
  }

  async createScreen(eventId: string, create: CreateScreenDto,): Promise<ScreenEntity> {
    const screen = new ScreenEntity()
    Object.assign(screen, create)
    screen.event = await this.eventRepo.findOne(eventId)
    return screen
  }
}
