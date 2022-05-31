import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TModule } from '../modules/modules.model';
import { Permission } from './permissions.model';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission) private permissionModel: typeof Permission,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionModel.findAll({
      limit: 50,
      include: [TModule],
    });
  }

  async findOne(id: number): Promise<Permission> {
    const permission = this.permissionModel.findOne({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException('permission not found');
    }
    return permission;
  }

  async findPermissionIdFromCode(code: number): Promise<Permission> {
    const permission = this.permissionModel.findOne({
      where: { code },
    });
    if (!permission) {
      throw new NotFoundException('permission not found');
    }
    return permission;
  }
}
