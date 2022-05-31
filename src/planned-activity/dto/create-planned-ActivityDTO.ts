import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum typeEnum {
  onetime,
  adhoc,
}

export enum statusEnum {
  planned,
  completed,
  deleted,
}
export class CreatePlannedActivityDTO {
  @ApiProperty()
  @IsNumber()
  userID: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  plotID: number;

  @ApiProperty()
  @IsNumber()
  activityTemplateID: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  dueDate: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsOptional()
  activityID: string;

  @ApiProperty()
  @IsJSON()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsJSON()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsJSON()
  @IsOptional()
  configuration: any;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(typeEnum)
  type: string;

  @ApiHideProperty()
  @IsString()
  @IsEnum(statusEnum)
  @IsOptional()
  status: string;

  @ApiHideProperty()
  @IsBoolean()
  @IsOptional()
  completedByActivity: boolean;
}

export class AssignPlannedActivityDTO {
  @ApiProperty()
  @IsNumber()
  projectID: number;

  @ApiProperty()
  @IsNumber()
  plotID: number;

  @ApiProperty()
  @IsNumber()
  userID: number;
}
