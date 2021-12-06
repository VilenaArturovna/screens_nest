import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {AuthGuard, OwnerGuard} from "../guards";

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, OwnerGuard],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UsersService]
})
export class UsersModule {}
