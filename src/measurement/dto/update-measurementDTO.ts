import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export enum status_type {
  recorded,
  pre_approved,
  pre_rejected,
  approved,
  rejected,
  ignored,
}

export class UpdateMeasurementStatusDTO {
  @IsString()
  @IsEnum(status_type)
  @ApiProperty()
  status: string;
}

export class SingleMeasurement {
  @IsString()
  @IsEnum(status_type)
  @ApiProperty()
  status: string;

  @IsString()
  @IsUUID()
  @ApiProperty()
  measurementID: string;
}

export class BatchApproveRejectMeasurement {
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty()
  @Type(() => SingleMeasurement)
  measurements: SingleMeasurement[];
}
