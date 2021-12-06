import {ApiProperty} from "@nestjs/swagger";
import {ArrayNotEmpty, ArrayUnique, IsArray} from "class-validator";

export class UpdatePlaylistDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @ApiProperty()
  filesIds: string[]
}
