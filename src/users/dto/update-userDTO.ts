import { IsOptional, IsString, IsEmail, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
  @IsString()
  @ApiProperty()
  @IsOptional()
  readonly firstName: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  readonly lastName: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsOptional()
  @Length(12, 20)
  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly country: string;
}

export class UpdateUserBody {
  @ApiProperty()
  user: UpdateUserDTO;
}
