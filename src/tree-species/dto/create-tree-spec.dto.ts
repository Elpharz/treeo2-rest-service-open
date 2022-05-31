import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsJSON,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateTreeSpecDto {
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsNumber()
  version: number;

  @ApiProperty()
  @IsNumber()
  matureDbhCm: number;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  latinName: string;

  @ApiProperty()
  @IsString()
  matureAge: string;

  @ApiProperty()
  @IsString()
  trivialName: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsJSON()
  benefits: any;

  @ApiProperty()
  @IsString()
  iconURL: string;

  @ApiProperty()
  @IsString()
  agbBiomassFormula: any;

  @ApiProperty()
  @IsString()
  agbCo2Formula: any;

  @ApiProperty()
  @IsArray()
  picturesURL: any;

  @ApiProperty()
  @IsArray()
  terrestialRegions: any;

  @ApiHideProperty()
  modifiedById: number;
}
