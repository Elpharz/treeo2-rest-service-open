import { Optional } from '@nestjs/common';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { PlotProject } from '../plot-projects/plot-projects.model';
import { Organization } from '../organizations/organizations.model';
import { UserProject } from '../user-projects/user-project.model';

@Table
export class Project extends Model {
  @Column({ allowNull: false })
  name: string;

  @Column({
    type: DataType.ENUM,
    values: ['started', 'pending', 'idle'],
    defaultValue: 'pending',
  })
  @Optional()
  projectStatus: string;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => Organization)
  organizationID: number;

  @BelongsTo(() => Organization)
  organization: Organization;

  @HasMany(() => UserProject)
  userProject: UserProject[];

  @HasMany(() => PlotProject)
  plotProject: PlotProject[];
}
