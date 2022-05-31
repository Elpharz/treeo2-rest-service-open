import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  Length,
  IsEmail,
} from 'class-validator';

export class CreateMobileUserDTO {
  @IsString()
  @ApiProperty()
  readonly firstName: string;

  @IsString()
  @ApiProperty()
  readonly lastName: string;

  @IsString()
  @Length(6, 50)
  @ApiProperty()
  password: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(12, 20)
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly country: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  username: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly isActive: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  preferedLogin: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  gdprAccepted: boolean;
}
