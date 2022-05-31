import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UserAssignProjectDTO {
  @IsNumber()
  @IsOptional()
  userID: number;

  @IsNumber()
  @ApiProperty()
  projectID: number;

  @IsNumber()
  @IsOptional()
  roleID: number;
}
