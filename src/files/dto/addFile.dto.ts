import {ApiProperty, ApiQuery} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Query} from "@nestjs/common";
import {FileType} from "../../constants";

export class AddFileDto {
  @IsNotEmpty()
  @IsEnum({FileType})
  @ApiProperty({enum: FileType})
  type: FileType

  //not worked
  @ApiQuery({name: 'type', enum: FileType})
  async filterByType(@Query('type') type: FileType = FileType.VIDEO) {}

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  fileName: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: string
}
