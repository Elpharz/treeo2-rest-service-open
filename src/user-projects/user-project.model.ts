import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Project } from '../projects/projects.model';
import { Optional } from '@nestjs/common';
import { Role } from '../roles/roles.model';

@Table
export class UserProject extends Model {
  @Column({ type: DataType.INTEGER, defaultValue: null })
  @Optional()
  @ForeignKey(() => Project)
  projectID: number;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => User)
  userID: number;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => Role)
  roleID: number;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => User)
  performedById: number;

  @Column({ type: DataType.DATE, defaultValue: null })
  valid_from: any;

  @Column({ type: DataType.DATE, defaultValue: null })
  valid_to: any;

  @Column({ defaultValue: 'PENDING' })
  status: string;

  @BelongsTo(() => Project)
  project: Project;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Role)
  role: Role;
}
