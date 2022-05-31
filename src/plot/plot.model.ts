import { Optional } from '@nestjs/common';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Project } from '../projects/projects.model';
import { Activity } from '../activity/activity.model';
import { PlotProject } from '../plot-projects/plot-projects.model';

@Table
export class Plot extends Model {
  @Column
  area: number;

  @Column
  externalId: string;

  @Column({ type: DataType.GEOMETRY, defaultValue: null })
  polygon: any;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => User)
  ownerID: number;

  @BelongsTo(() => User)
  owner: User;

  @HasMany(() => Activity)
  activity: Activity[];

  @HasMany(() => PlotProject)
  plotProject: PlotProject[];

  @Column({
    type: DataType.ENUM,
    values: ['active', 'deleted'],
    defaultValue: 'active',
  })
  @Optional()
  status: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  plotName: string;
}
