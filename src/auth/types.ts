import {UserEntity} from "../users/user.entity";
import {ApiProperty, OmitType} from "@nestjs/swagger";
import { Request } from 'express';

export class AuthUserResponse extends OmitType(UserEntity, ['hashPassword']) {
  @ApiProperty()
  token: string
}

export type ExpressRequest = Request & { user?: UserEntity };
