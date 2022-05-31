import {
  BelongsTo,
  HasMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { ActivityTemplate } from '../activitytemplate/activitytemplate.model';
import { Plot } from '../plot/plot.model';
import { Optional } from '@nestjs/common';
import { Questionnaire } from '../questionnaire/questionnaire.model';
import { Device } from '../device/device.model';
import sequelize from 'sequelize';
import { Measurement } from '../measurement/measurement.model';
import { PlannedActivity } from '../planned-activity/planned-activity.model';

@Table
export class Activity extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: sequelize.UUIDV4,
    primaryKey: true,
  })
  id: any;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => ActivityTemplate)
  activityTemplateID: number;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => User)
  userID: number;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => Plot)
  plotID: number;

  @BelongsTo(() => Plot)
  plot: Plot;

  @Column({ type: DataType.DATE })
  startDate: any;

  @Column({ type: DataType.DATE })
  endDate: any;

  //   this is a timestamp
  @Column({ type: DataType.DATE })
  synced: any;

  @Column({ defaultValue: 0 })
  restarted: number;

  @Column({ type: DataType.TEXT, defaultValue: null })
  @Optional()
  note: string;

  @Column
  mobileAppVersion: string;

  @Column({ type: DataType.GEOMETRY, defaultValue: null })
  @Optional()
  outsidePolygon: any;

  @Column({ defaultValue: true })
  fullyCompleted: boolean;

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: null })
  @Optional()
  labels: string[];

  @Column({ type: DataType.TEXT, defaultValue: null })
  @Optional()
  comment: string;

  @Column
  @Optional()
  commentAudio: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  measurementCount: number;

  @Column
  @Optional()
  totalSteps: number;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => Questionnaire)
  preQuestionnaireID: number;

  @Column({ type: DataType.JSONB, defaultValue: null })
  @Optional()
  preQuestionnaireData: any;

  @Column({ type: DataType.ARRAY(DataType.TEXT), defaultValue: null })
  @Optional()
  duplicateData: string[];

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => Questionnaire)
  @Optional()
  postQuestionnaireID: number;

  @Column({ type: DataType.JSONB, defaultValue: null })
  @Optional()
  postQuestionnaireData: any;

  @Column({ type: DataType.UUID, defaultValue: null })
  @ForeignKey(() => Device)
  deviceInformationID: string;

  @BelongsTo(() => Device)
  deviceInformation: Device;

  @BelongsTo(() => ActivityTemplate)
  activityTemplate: ActivityTemplate;

  @BelongsTo(() => User)
  perfomedBy: User;

  @HasMany(() => Measurement)
  measurement: Measurement[];

  @HasMany(() => PlannedActivity)
  plannedActivity: PlannedActivity[];

  @Column({
    type: DataType.ENUM,
    values: [
      'completed',
      'rejected',
      'partially_recorded',
      'recorded',
      'pre_approved',
      'pre_rejected',
      'approved',
    ],
    defaultValue: 'partially_recorded',
  })
  @Optional()
  status: string;

  @Column({
    type: DataType.ENUM,
    values: ['land_survey', 'questionnaire', 'one_tree', 'tree_survey'],
    defaultValue: 'tree_survey',
  })
  @Optional()
  activityType: string;
}
