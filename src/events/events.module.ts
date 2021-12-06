import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EventEntity} from "./event.entity";
import {AuthGuard, OwnerGuard} from "../guards";
import {UsersService} from "../users/users.service";
import {UserEntity} from "../users/user.entity";

@Module({
  controllers: [EventsController],
  providers: [EventsService, AuthGuard, OwnerGuard, UsersService],
  imports: [TypeOrmModule.forFeature([EventEntity, UserEntity])]
})
export class EventsModule {}
