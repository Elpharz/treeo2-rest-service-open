import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly organizationID: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly operation: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly code: number;
}
