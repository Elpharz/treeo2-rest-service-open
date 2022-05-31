import { Optional } from '@nestjs/common';
import sequelize from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Activity } from '../activity/activity.model';

@Table
export class Measurement extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: sequelize.UUIDV4,
    primaryKey: true,
  })
  id: any;

  @Column
  dateTime: string;

  @Column
  treeDBHmm: number;

  @Column
  treeHealth: string;

  @Column
  treeHeightMm: number;

  @Column({ defaultValue: null })
  @Optional()
  stepsSinceLastMeasurement: number;

  @Column({
    type: DataType.ENUM,
    values: [
      'land_photo',
      'soil_photo',
      'tree_measurement_auto',
      'tree_measurement_manual',
      'tree_measurement_auto_not_detected',
      'tree_measurement_auto_rejected',
      'tree_evidence',
      'tree_evidence_rejected',
    ],
  })
  @Optional()
  measurement_type: string;

  @Optional()
  postion: number;

  @Column({ defaultValue: null })
  @Optional()
  gpsLocation: string;

  @Column({ type: DataType.GEOGRAPHY, defaultValue: null })
  gpscoordinates: any;

  @Column({ type: DataType.FLOAT, defaultValue: null })
  @Optional()
  gpsAccuracy: number;

  @Column({ type: DataType.JSONB, defaultValue: null })
  @Optional()
  additionalData: any;

  @Column({ type: DataType.ARRAY(DataType.TEXT), defaultValue: null })
  @Optional()
  duplicateData: string[];

  @Column({
    type: DataType.ENUM,
    values: [
      'recorded',
      'pre_approved',
      'pre_rejected',
      'approved',
      'rejected',
      'ignored',
    ],
    defaultValue: 'recorded',
  })
  @Optional()
  status: string;

  @Column({ type: DataType.UUID, defaultValue: null })
  @Optional()
  @ForeignKey(() => Activity)
  activityID: string;

  @Column({ type: DataType.ARRAY(DataType.TEXT), defaultValue: null })
  @Optional()
  images: string[];

  @BelongsTo(() => Activity)
  activity: Activity;
}
