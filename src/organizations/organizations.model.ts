import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Role } from '../roles/roles.model';
import { Project } from '../projects/projects.model';
import { Optional } from '@nestjs/common';

@Table
export class Organization extends Model {
  @Column({ defaultValue: 'Fair Ventures Worldwide' })
  name: string;

  @Column({ allowNull: false })
  country: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  @Optional()
  code: string;

  @Column({
    type: DataType.ENUM,
    values: ['active', 'inactive', 'pending'],
    defaultValue: 'inactive',
  })
  @Optional()
  status: string;

  @Column
  @Optional()
  activeFrom: string;

  @Column
  @Optional()
  activeTo: string;

  @HasMany(() => Role)
  roles: Role[];

  @HasMany(() => Project)
  projects: Project[];
}
