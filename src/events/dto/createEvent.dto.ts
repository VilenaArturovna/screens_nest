import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {ArrayNotEmpty, ArrayUnique, IsArray, IsDateString, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ScreenEntity} from "../../screens/screen.entity";

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  date: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  screens: ScreenEntity[]
}
