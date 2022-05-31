import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsArray,
} from 'class-validator';

export enum measurement_type {
  land_photo,
  soil_photo,
  tree_measurement_auto,
  tree_measurement_manual,
  tree_measurement_auto_not_detected,
  tree_measurement_auto_rejected,
  tree_evidence,
  tree_evidence_rejected,
}

export enum measurement_status {
  recorded = 'recorded',
  pre_approved = 'pre_approved',
  pre_rejected = 'pre_rejected',
  approved = 'pre_rejected',
  rejected = 'rejected',
  ignored = 'ignored',
}

export class CreateMeasurementDTO {
  @IsString()
  @ApiProperty()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dateTime: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  treeDBHmm: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  treeHealth: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  treeHeightMm: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  stepsSinceLastMeasurement: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(measurement_type)
  @ApiProperty()
  measurement_type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  gpsLocation: string;

  @IsArray()
  @IsOptional()
  gpscoordinates: any;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  gpsAccuracy: number;

  @IsJSON()
  @IsOptional()
  @ApiProperty()
  additionalData: any;

  @IsUUID()
  @ApiProperty()
  @IsOptional()
  activityID: string;

  @IsOptional()
  @IsString()
  @IsEnum(measurement_status)
  @ApiHideProperty()
  status: string;
}
