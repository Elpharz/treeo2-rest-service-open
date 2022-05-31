import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../roles/roles.model';
import { Permission } from '../permissions/permissions.model';

@Table
export class RolePermission extends Model {
  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => Role)
  roleID: number;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => Permission)
  permissionID: number;
}
