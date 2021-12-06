import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {ScreenEntity} from "./screen.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {EventEntity} from "../events/event.entity";
import {Repository} from "typeorm";
import {CreateScreenDto} from "./dto/createScreen.dto";
import {PlaylistEntity} from "../playlists/playlist.entity";

@Injectable()
export class ScreensService extends TypeOrmCrudService<ScreenEntity>{
  constructor(@InjectRepository(ScreenEntity) repo,
              @InjectRepository(EventEntity) private readonly eventRepo: Repository<EventEntity>,
              @InjectRepository(PlaylistEntity) private readonly playlistRepo: Repository<EventEntity>
              ) {
    super(repo);
  }

  async findAll(query: any): Promise<ScreenEntity[]> {
    const screens = query.eventId
      ? await this.repo.find({relations: ['event'], where: {event: {id: query.eventId}}})
      : await this.repo.find()
    return screens
  }

  async createScreen(create: CreateScreenDto,): Promise<ScreenEntity> {
    const screen = new ScreenEntity()
    screen.event = await this.eventRepo.findOne(create.eventId)
    delete create.eventId
    Object.assign(screen, create)
    const newScreen = await this.repo.save(screen)

    const playlist = new PlaylistEntity()
    playlist.screen = newScreen
    playlist.duration = 0
    await this.playlistRepo.save(playlist)

    return newScreen
  }
}
