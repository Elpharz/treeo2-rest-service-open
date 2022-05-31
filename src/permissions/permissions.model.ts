import { Optional } from '@nestjs/common';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TModule } from '../modules/modules.model';
import { RolePermission } from '../roles-permissions/role-permissions.model';
import { Role } from '../roles/roles.model';

@Table
export class Permission extends Model {
  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false, unique: true })
  @Optional()
  code: number;

  @BelongsToMany(() => Role, () => RolePermission)
  roles: Role[];

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => TModule)
  moduleID: number;

  @BelongsTo(() => TModule)
  module: TModule;
}
