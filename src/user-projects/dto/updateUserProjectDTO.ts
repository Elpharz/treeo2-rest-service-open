import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { user_project_enums } from './enums';

export class UpdateUserProjectDTO {
  @IsNumber()
  @ApiProperty()
  userID: number;

  @IsNumber()
  @ApiProperty()
  projectID: number;

  @IsNumber()
  @ApiProperty()
  roleID: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  performedById: number;

  @IsEnum(user_project_enums)
  @ApiProperty()
  @IsOptional()
  status: string;
}
