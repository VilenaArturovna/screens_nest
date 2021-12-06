import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {FileEntity} from "./file.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {AddFileDto} from "./dto/addFile.dto";
import {UserEntity} from "../users/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class FilesService extends TypeOrmCrudService<FileEntity>{
  constructor(@InjectRepository(FileEntity) repo,
              @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {
    super(repo);
  }

  async findAll(userId: string): Promise<FileEntity[]> {
    return await this.repo.find({relations: ['user'], where: {user: {id: userId}}} )
  }

  async addFile(addFileDto: AddFileDto, userId: string): Promise<FileEntity> {
    const file = new FileEntity()
    Object.assign(file, addFileDto)
    file.fileKey = 'https://yandex.ru/'
    file.user = await this.userRepo.findOne(userId)

    return await this.repo.save(file)
  }
}
