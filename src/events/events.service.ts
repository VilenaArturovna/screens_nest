import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {EventEntity} from "./event.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateEventDto} from "./dto/createEvent.dto";
import {UserEntity} from "../users/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class EventsService extends TypeOrmCrudService<EventEntity>{
  constructor(@InjectRepository(EventEntity) repo,
              @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {
    super(repo);
  }

  async findAll(userId: string): Promise<EventEntity[]> {
    return await this.repo.find({relations: ['user'], where: {user: {id: userId}}} )
  }

  async createEvent(create: CreateEventDto, userId: string): Promise<EventEntity> {
    const event = new EventEntity()
    Object.assign(event, create)
    event.user = await this.userRepo.findOne(userId)

    return await this.repo.save(event)
  }
}
