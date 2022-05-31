import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordDTO {
  @IsString()
  @ApiProperty()
  readonly password1: string;

  @IsString()
  @ApiProperty()
  readonly password2: string;
}
