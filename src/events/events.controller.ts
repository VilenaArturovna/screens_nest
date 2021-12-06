import {Body, Controller, UseGuards} from '@nestjs/common';
import {Crud, CrudController, Override} from "@nestjsx/crud";
import {EventEntity} from "./event.entity";
import {EventsService} from "./events.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {CreateEventDto} from "./dto/createEvent.dto";
import {OwnerEventGuard} from "./guards/ownerEvent.guard";
import {User} from "../decorators/user.decorator";
import {AuthGuard} from "../guards/auth.guard";

@ApiTags('events')
@ApiBearerAuth()
@Crud({
  model: {
    type: EventEntity
  },
  dto: {
    update: CreateEventDto,
  },
  routes: {
    updateOneBase: {
      decorators: [UseGuards(OwnerEventGuard)]
    },
    getOneBase: {
      decorators: [UseGuards(OwnerEventGuard)]
    },
    deleteOneBase: {
      decorators: [UseGuards(OwnerEventGuard)]
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
@Controller('events')
export class EventsController implements CrudController<EventEntity>{
  constructor(public service: EventsService) {
  }

  @Override('getManyBase')
  async findAll(@User('id') userId: string) {
    return await this.service.findAll(userId)
  }

  @Override('createOneBase')
  async createEvent(@Body() create: CreateEventDto, @User('id') userId: string): Promise<EventEntity> {
    return await this.service.createEvent(create, userId)
  }
}
