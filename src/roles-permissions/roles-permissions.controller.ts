import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { BulkCreateRolePermission } from './dto/bulk-create-role-permissions';
import { RolesPermissionsService } from './roles-permissions.service';

@Controller('role_permissions')
export class RolesPermissionsController {
  constructor(private readonly rolepermissoin: RolesPermissionsService) {}

  @Post()
  @ApiOkResponse({ description: 'bulk create permissions on a role' })
  bulkCreateRolePermission(@Body() roleData: BulkCreateRolePermission) {
    return this.rolepermissoin.bulkCreateRolePermission(roleData);
  }
}
