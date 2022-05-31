import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Permission } from '../permissions/permissions.model';

@Table
export class TModule extends Model {
  @Column({ allowNull: false })
  name: string;

  @HasMany(() => Permission)
  permissions: Permission[];
}
