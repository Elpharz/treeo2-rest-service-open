import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Organization } from '../organizations/organizations.model';
import { Permission } from '../permissions/permissions.model';
import { RolePermission } from '../roles-permissions/role-permissions.model';
import { UserProject } from '../user-projects/user-project.model';

@Table
export class Role extends Model {
  @Column({ allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => Organization)
  organizationID: number;

  @BelongsTo(() => Organization)
  organization: Organization;

  @BelongsToMany(() => Permission, () => RolePermission)
  permissions: Permission[];

  @HasMany(() => UserProject)
  userProject: UserProject[];
}
