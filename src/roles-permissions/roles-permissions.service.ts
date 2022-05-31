import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { admin_user, permission_names } from '../auth/constants.permissions';
import { PermissionsService } from '../permissions/permissions.service';
import { RolesService } from '../roles/roles.service';
import { BulkCreateRolePermission } from './dto/bulk-create-role-permissions';
import { CreateRolePermissionDTO } from './dto/create-role-permissionDTO';
import { RolePermission } from './role-permissions.model';

@Injectable()
export class RolesPermissionsService {
  logger: Logger = new Logger(RolesPermissionsService.name);
  constructor(
    @InjectModel(RolePermission) private rolePermission: typeof RolePermission,
    private roleService: RolesService,
    private permissionService: PermissionsService,
  ) {}

  async findOne(id: number): Promise<RolePermission> {
    const rolePermission = await this.rolePermission.findOne({
      where: { id },
    });
    if (!rolePermission) {
      throw new NotFoundException('role not found');
    }
    return rolePermission;
  }

  async create(data: CreateRolePermissionDTO) {
    await this.roleService.findOne(data.roleID);
    await this.permissionService.findOne(data.permissionID);
    const createdRolePermission =
      await this.rolePermission.create<RolePermission>(data);
    return {
      data: createdRolePermission.id,
      message: 'role permission created',
    };
  }

  // TODO: add e2e tests
  async bulkCreateRolePermission(data: BulkCreateRolePermission) {
    await this.roleService.findOne(data.roleID);
    let result;
    permission_names[data.basePermissionName].base_permissions.forEach(
      async (code) => {
        const permissionId =
          await this.permissionService.findPermissionIdFromCode(code);
        result = await this.create({
          roleID: data.roleID,
          permissionID: permissionId.id,
        });
        this.logger.debug(result);
        this.logger.debug(code);
      },
    );
    return {
      data: '',
      message: `created bulk permissions intent ${data.basePermissionName}`,
    };
  }
}
