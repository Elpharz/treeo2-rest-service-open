import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReAssignProjectToOrganizationDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  projectId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  orgId: number;
}
