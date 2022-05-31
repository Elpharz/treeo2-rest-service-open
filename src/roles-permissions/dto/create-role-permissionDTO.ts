import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRolePermissionDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly roleID: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly permissionID: number;
}
