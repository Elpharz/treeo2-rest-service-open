import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsArray,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

export class CreatePlotDTO {
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  area: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  externalId: string;

  @IsArray()
  @ApiProperty()
  @IsOptional()
  polygon: any;

  @IsArray()
  @ApiProperty()
  @IsOptional()
  point: any;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  ownerID: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  status: string;
}

export class CreatePlotDTOV2 extends CreatePlotDTO {
  @IsString()
  @ApiProperty()
  @Length(1, 50)
  plotName: string;
}
