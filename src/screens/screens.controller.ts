import {Body, Controller, Param, UseGuards} from '@nestjs/common';
import {Crud, CrudController, Override} from "@nestjsx/crud";
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
@Controller(':eventId/screens')
export class ScreensController implements CrudController<ScreenEntity>{
  constructor(public service: ScreensService) {
  }

  @Override('createOneBase')
  async createScreen(@Param('eventId') eventId: string, @Body() create: CreateScreenDto,): Promise<ScreenEntity> {
    return await this.service.createScreen(eventId, create)
  }
}
