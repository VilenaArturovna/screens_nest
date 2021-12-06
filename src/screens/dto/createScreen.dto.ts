import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateScreenDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly model: string;

  @IsNumber()
  @ApiPropertyOptional()
  readonly releaseYear: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly eventId: string
}
