import { IsString, IsNumber, IsOptional } from 'class-validator';

export class LogDto {
  @IsNumber()
  @IsOptional()
  readonly userViewedId: number;

  @IsNumber()
  @IsOptional()
  readonly viewerId: number;

  @IsString()
  readonly role: string;

  @IsString()
  readonly eventType: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly host: string;

  @IsString()
  readonly method: string;

  @IsString()
  readonly requestUrl: string;

  @IsString()
  readonly token: string;

  @IsString()
  readonly error: string;

  @IsString()
  readonly status: string;

  @IsString()
  readonly reason: string;
}
