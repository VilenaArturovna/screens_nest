import {Body, Controller, UseGuards} from '@nestjs/common';
import {Crud, CrudController, Override} from "@nestjsx/crud";
import {EventEntity} from "./event.entity";
import {EventsService} from "./events.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {CreateEventDto} from "./dto/createEvent.dto";
import {AuthGuard, OwnerGuard} from "../guards";
import {OwnerEventGuard} from "./guards/ownerEvent.guard";
import {User} from "../decorators/user.decorator";

@ApiTags('events')
@ApiBearerAuth()
@Crud({
  model: {
    type: EventEntity
  },
  dto: {
    create: CreateEventDto,
    update: CreateEventDto,
  },
  routes: {
    //only: ['getManyBase', 'getOneBase', 'updateOneBase', 'deleteOneBase', 'createOneBase'],
    updateOneBase: {
      decorators: [UseGuards(OwnerEventGuard)]
    }
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

  @Override('createOneBase')
  async createEvent(@Body() create: CreateEventDto, @User('id') userId: string) {
    return await this.service.createEvent(create, userId)
  }
}
