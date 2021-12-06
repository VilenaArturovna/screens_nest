import { Controller } from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {UserEntity} from "./user.entity";
import {UsersService} from "./users.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UpdateUserDto} from "./dto/updateUser.dto";

@ApiTags('users')
@ApiBearerAuth()
@Crud({
  model: {
    type: UserEntity
  },
  dto: {
    update: UpdateUserDto
  },
  routes: {
    only: ['getOneBase', 'updateOneBase'],
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@Controller('users')
export class UsersController implements CrudController<UserEntity>{
  constructor(public service: UsersService) {
  }
}
