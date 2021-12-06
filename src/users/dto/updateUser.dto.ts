import {OmitType} from "@nestjs/swagger";
import {CreateUserDto} from "../../auth/dto/createUser.dto";

export class UpdateUserDto extends OmitType(CreateUserDto, ['email', "password"] as const){}
