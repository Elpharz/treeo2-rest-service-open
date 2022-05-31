import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly projectStatus: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly organizationID: number;
}
