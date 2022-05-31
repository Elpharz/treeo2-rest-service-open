import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateUserProjectDTO {
  @IsNumber()
  @ApiProperty()
  userID: number;

  @IsNumber()
  @ApiProperty()
  projectID: number;

  @IsNumber()
  @ApiProperty()
  roleID: number;
}
