import { Optional } from '@nestjs/common';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { Plot } from '../plot/plot.model';
import { Project } from '../projects/projects.model';

@Table
export class PlotProject extends Model {
  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => Plot)
  plotID: number;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => Project)
  projectID: number;

  @Column({
    type: DataType.ENUM,
    values: ['active', 'deleted'],
    defaultValue: 'active',
  })
  @Optional()
  status: string;

  @BelongsTo(() => Plot)
  plot: Plot;

  @BelongsTo(() => Project)
  project: Project;
}
