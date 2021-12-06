import {Body, Controller, UseGuards} from '@nestjs/common';
import {Crud, CrudController, Override} from "@nestjsx/crud";
import {FileEntity} from "./file.entity";
import {FilesService} from "./files.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {AddFileDto} from "./dto/addFile.dto";
import {UpdateFileDto} from "./dto/updateFile.dto";
import {OwnerFilesGuard} from "./guards/ownerFiles.guard";
import {User} from "../decorators/user.decorator";

@ApiTags('files')
@ApiBearerAuth()
@Crud({
  model: {
    type: FileEntity
  },
  dto: {
    update: UpdateFileDto,
  },
  routes: {
    updateOneBase: {
      decorators: [UseGuards(OwnerFilesGuard)]
    },
    getOneBase: {
      decorators: [UseGuards(OwnerFilesGuard)]
    },
    deleteOneBase: {
      decorators: [UseGuards(OwnerFilesGuard)]
    },
    exclude: ['createManyBase', 'recoverOneBase', "replaceOneBase"]
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@Controller('files')
export class FilesController implements CrudController<FileEntity>{
  constructor(public service: FilesService) {
  }

  @Override('getManyBase')
  async findAll(@User('id') userId: string) {
    return await this.service.findAll(userId)
  }

  @Override('createOneBase')
  async addFile(@Body() addFileDto: AddFileDto, @User('id') userId: string): Promise<FileEntity> {
    return await this.service.addFile(addFileDto, userId)
  }
}
