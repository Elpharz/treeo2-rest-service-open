import { Optional } from '@nestjs/common';
import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { PlannedActivity } from '../planned-activity/planned-activity.model';
import { Project } from '../projects/projects.model';
import { Questionnaire } from '../questionnaire/questionnaire.model';

@Table
export class ActivityTemplate extends Model {
  @Column({
    type: DataType.ENUM,
    values: [
      'questionnaire',
      'land_survey',
      'tree_monitoring',
      'one_tree',
      'tree_survey',
    ],
  })
  activityType: string;

  @Column
  code: number;

  @Column({ type: DataType.JSONB, defaultValue: null })
  @Optional()
  configuration: any;

  @Column({ type: DataType.JSONB, defaultValue: null })
  @Optional()
  title: any;

  @Column({ type: DataType.JSONB, defaultValue: null })
  description: any;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActive: boolean;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  autoGenerateOffset: number;

  @Column({
    type: DataType.ENUM,
    values: ['manual', 'project_join_pending'],
    defaultValue: 'manual',
  })
  activityTemplateType: string;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => Project)
  projectID: number;

  @Column({
    type: DataType.ENUM,
    values: ['onetime', 'adhoc'],
    defaultValue: 'adhoc',
  })
  @Optional()
  frequency: string;

  @HasMany(() => PlannedActivity)
  plannedActivity: PlannedActivity[];

  @HasMany(() => Questionnaire)
  questionnaire: Questionnaire[];
}
