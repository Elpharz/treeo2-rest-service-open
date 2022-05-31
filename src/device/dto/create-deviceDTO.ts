import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly manufacturer: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly model: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  androidVersion: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly totalRAM: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly freeRAM: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly totalInternalStorage: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly totalCardStorage: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly sensors: string[];

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly installedApps: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly advertisingID: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly screenResolution: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly cameraInformation: string;
}
