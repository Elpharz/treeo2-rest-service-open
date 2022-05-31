import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum BasePermissions {
  base_user,
  admin_user,
  super_admin_user,
}

export class BulkCreateRolePermission {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly roleID: number;

  @IsString()
  @IsEnum(BasePermissions)
  @ApiProperty()
  readonly basePermissionName: string;
}
