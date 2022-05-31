import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsArray,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreatePlotProjectDTO {
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  plotID: number;

  // @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  projectID: number;

  // @IsNumber()
  @ApiProperty()
  @IsOptional()
  status: string;
}
