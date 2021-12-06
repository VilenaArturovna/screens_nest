import {Body, Controller, Query, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {Crud, CrudController, Override} from "@nestjsx/crud";
import {ScreenEntity} from "./screen.entity";
import {ScreensService} from "./screens.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {CreateScreenDto} from "./dto/createScreen.dto";
import {AuthGuard} from "../guards/auth.guard";
import {OwnerScreenGuard} from "./guards/ownerScreen.guard";

@ApiTags('screens')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
@Crud({
  model: {
    type: ScreenEntity
  },
  dto: {
    update: CreateScreenDto,
  },
  routes: {
    updateOneBase: {
      decorators: [UseGuards(OwnerScreenGuard)]
    },
    getOneBase: {
      decorators: [UseGuards(OwnerScreenGuard)]
    },
    deleteOneBase: {
      decorators: [UseGuards(OwnerScreenGuard)]
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
@UseGuards(AuthGuard)
@Controller('screens')
export class ScreensController implements CrudController<ScreenEntity>{
  constructor(public service: ScreensService) {
  }

  @Override('getManyBase')
  async findAll(@Query() query: any): Promise<ScreenEntity[]>  {
    return await this.service.findAll(query)
  }

  @Override('createOneBase')
  async createScreen(@Body() create: CreateScreenDto): Promise<ScreenEntity> {
    return await this.service.createScreen(create)
  }
}
