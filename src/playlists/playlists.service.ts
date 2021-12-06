import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {PlaylistEntity} from "./playlist.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UpdatePlaylistDto} from "./dto/updatePlaylist.dto";
import {FileEntity} from "../files/file.entity";
import {Repository} from "typeorm";

@Injectable()
export class PlaylistsService extends TypeOrmCrudService<PlaylistEntity> {
  constructor(@InjectRepository(PlaylistEntity) repo,
              @InjectRepository(FileEntity) private readonly filesRepo: Repository<FileEntity>) {
    super(repo);
  }

  async updatePlaylist(id: string, updateDto: UpdatePlaylistDto): Promise<PlaylistEntity> {
    const playlist = await this.repo.findOne(id)
    const filesIds = updateDto.filesIds.map(id => ({id}))
    const files = await this.filesRepo.find({where: filesIds})
    const durations = files.map(file => file.duration)

    playlist.files = files
    playlist.duration = durations.reduce(function (sum, current) {
      return sum + current;
    }, 0)

    return await this.repo.save(playlist)
  }
}
