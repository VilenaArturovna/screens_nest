import {OmitType} from "@nestjs/swagger";
import {CreateUserDto} from "./createUser.dto";

export class AuthUserDto extends OmitType(CreateUserDto, ['username']){}
