import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestOtpDTO {
  @IsString()
  @ApiProperty()
  phoneNumber: string;
}

export class VerifyOtpDTO {
  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  @ApiProperty()
  code: string;
}
