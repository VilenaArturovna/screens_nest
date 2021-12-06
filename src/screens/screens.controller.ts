import {Controller, UseGuards} from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {ScreenEntity} from "./screen.entity";
import {ScreensService} from "./screens.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {CreateScreenDto} from "./dto/createScreen.dto";
import {AuthGuard} from "../guards/auth.guard";

@ApiTags('screens')
@ApiBearerAuth()
@Crud({
  model: {
    type: ScreenEntity
  },
  dto: {
    create: CreateScreenDto,
    update: CreateScreenDto,
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'updateOneBase', 'deleteOneBase', 'createOneBase'],
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@UseGuards(AuthGuard)
@Controller('screens')
export class ScreensController implements CrudController<ScreenEntity>{
  constructor(public service: ScreensService) {
  }
}
