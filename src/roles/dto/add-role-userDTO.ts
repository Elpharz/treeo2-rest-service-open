import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddRoleToUserDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly roleID: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;
}
