import { Optional } from '@nestjs/common';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ActivityTemplate } from '../activitytemplate/activitytemplate.model';
import { Project } from '../projects/projects.model';

@Table
export class Questionnaire extends Model {
  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => Project)
  projectID: number;

  @Column({ type: DataType.JSONB, defaultValue: null })
  @Optional()
  configuration: any;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => ActivityTemplate)
  activityTemplateID: number;

  @BelongsTo(() => ActivityTemplate)
  activityTemplate: ActivityTemplate;

  @Column({
    type: DataType.ENUM,
    values: ['pre_questionnaire', 'post_questionnaire'],
    defaultValue: null,
  })
  @Optional()
  type: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  @Optional()
  active: boolean;
}
