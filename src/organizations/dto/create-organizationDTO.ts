import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  country: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly code: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly status: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly active_from: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly active_to: string;
}
