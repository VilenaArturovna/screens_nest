import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EventEntity} from "./event.entity";
import {UsersService} from "../users/users.service";
import {UserEntity} from "../users/user.entity";
import {AuthGuard} from "../guards/auth.guard";

@Module({
  controllers: [EventsController],
  providers: [EventsService, AuthGuard, UsersService],
  imports: [TypeOrmModule.forFeature([EventEntity, UserEntity])],
  exports: [EventsService]
})
export class EventsModule {}
