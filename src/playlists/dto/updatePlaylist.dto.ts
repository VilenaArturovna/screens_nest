import {FileEntity} from "../../files/file.entity";
import {ApiProperty} from "@nestjs/swagger";
import {ArrayNotEmpty, ArrayUnique, IsArray} from "class-validator";

export class UpdatePlaylistDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @ApiProperty({type: [FileEntity]})
  files: FileEntity[]
}
