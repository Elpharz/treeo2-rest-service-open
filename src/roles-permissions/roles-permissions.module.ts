import { Module } from '@nestjs/common';
import { RolesPermissionsService } from './roles-permissions.service';
import { RolesPermissionsController } from './roles-permissions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolePermission } from './role-permissions.model';
import { RolesModule } from '../roles/roles.module';
import { PermissionsService } from '../permissions/permissions.service';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    SequelizeModule.forFeature([RolePermission]),
    RolesModule,
    PermissionsModule,
  ],
  providers: [RolesPermissionsService, PermissionsService],
  controllers: [RolesPermissionsController],
  exports: [RolesPermissionsService, SequelizeModule],
})
export class RolesPermissionsModule {}
