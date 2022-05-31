import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserOrganizationDTO {
  @IsString()
  @ApiProperty()
  orgName: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;
}
