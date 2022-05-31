import {
  IsBoolean,
  IsOptional,
  IsString,
  IsEmail,
  Length,
  IsAlpha,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  @IsAlpha()
  @ApiProperty()
  readonly firstName: string;

  @IsString()
  @IsAlpha()
  @ApiProperty()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  @Length(6, 50)
  @ApiProperty()
  password: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @Length(12, 20)
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @IsAlpha()
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

export class LoginDTO {
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(6, 50)
  @ApiProperty()
  password: string;

  @IsString()
  @IsOptional()
  @Length(12, 20)
  @ApiProperty()
  phoneNumber: string;
}
