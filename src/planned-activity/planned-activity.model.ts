import { Optional } from '@nestjs/common';
import {
  DataType,
  ForeignKey,
  Column,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { Activity } from '../activity/activity.model';
import { ActivityTemplate } from '../activitytemplate/activitytemplate.model';
import { Plot } from '../plot/plot.model';
import { User } from '../users/users.model';

@Table
export class PlannedActivity extends Model {
  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => User)
  userID: number;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => Plot)
  plotID: number;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => ActivityTemplate)
  activityTemplateID: number;

  @Column({ type: DataType.DATE, defaultValue: null })
  dueDate: any;

  @Column({ type: DataType.UUID, defaultValue: null })
  @ForeignKey(() => Activity)
  activityID: string;

  @Column({ type: DataType.JSONB, defaultValue: null })
  title: string;

  @Column({ type: DataType.JSONB, defaultValue: null })
  description: string;

  @Column({ type: DataType.JSONB, defaultValue: null })
  configuration: any;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Plot)
  plot: Plot;

  @BelongsTo(() => ActivityTemplate)
  activityTemplate: ActivityTemplate;

  @Column({
    type: DataType.ENUM,
    values: ['onetime', 'adhoc'],
    defaultValue: 'adhoc',
  })
  @Optional()
  type: string;

  @Column({
    type: DataType.ENUM,
    values: ['planned', 'completed', 'deleted'],
    defaultValue: 'planned',
  })
  @Optional()
  status: string;
}
