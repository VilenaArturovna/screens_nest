import { Controller } from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {FileEntity} from "./file.entity";
import {FilesService} from "./files.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {AddFileDto} from "./dto/addFile.dto";
import {UpdateFileDto} from "./dto/updateFile.dto";

@ApiTags('files')
@ApiBearerAuth()
@Crud({
  model: {
    type: FileEntity
  },
  dto: {
    create: AddFileDto,
    update: UpdateFileDto,
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'updateOneBase', 'deleteOneBase', 'createOneBase',],
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
}
