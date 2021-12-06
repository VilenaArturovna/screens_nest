import {OmitType} from "@nestjs/swagger";
import {AddFileDto} from "./addFile.dto";

export class UpdateFileDto extends OmitType(AddFileDto, ['type'] as const) {}
