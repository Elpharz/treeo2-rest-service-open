import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsBoolean,
  IsJSON,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { CreateMeasurementDTO } from '../../measurement/dto/create-measurementDTO';

export class Activity {
  @IsString()
  @ApiProperty()
  @IsUUID()
  id: string;

  @IsNumber()
  @ApiProperty()
  activityTemplateID: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  userID: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  plotID: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  startDate: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  endDate: string;

  //   this is timeStamp
  @IsString()
  @IsOptional()
  @ApiProperty()
  synced: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  restarted: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  mobileAppVersion: string;

  @IsArray()
  @ApiProperty()
  outsidePolygon: any;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  fullyCompleted: boolean;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  labels: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  comment: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  note: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  commentAudio: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  totalSteps: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  preQuestionnaireID: number;

  @IsJSON()
  @IsOptional()
  @ApiProperty()
  preQuestionnaireData: any;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  postQuestionnaireID: number;

  @IsJSON()
  @IsOptional()
  @ApiProperty()
  postQuestionnaireData: any;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  deviceInformationID: string;

  @IsNumber()
  @ApiProperty()
  measurementCount: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  activityType: string;

  @ValidateNested({ each: true })
  @Type(() => CreateMeasurementDTO)
  @IsOptional()
  measurement: CreateMeasurementDTO;
}

export class Measurement extends CreateMeasurementDTO {}

export class CreateActivityDTO {
  @ValidateNested({ each: true })
  @Type(() => Activity)
  activity!: Activity;
}

export class UpdateActivityDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  outsidePolygon: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  fullyCompleted: boolean;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  labels: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  comment: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  note: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  commentAudio: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  plotID: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  status: string;
}
