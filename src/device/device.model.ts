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
import { User } from '../users/users.model';

@Table
export class Device extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: sequelize.UUIDV4,
    primaryKey: true,
  })
  id: any;

  @Column
  @Optional()
  manufacturer: string;

  @Column
  @Optional()
  model: string;

  @Column
  @Optional()
  androidVersion: string;

  @Column
  @Optional()
  totalRAM: string;

  @Column
  @Optional()
  freeRAM: string;

  @Column
  @Optional()
  totalInternalStorage: string;

  @Column
  @Optional()
  totalCardStorage: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: null })
  @Optional()
  sensors: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: null })
  @Optional()
  installedApps: string[];

  @Column
  @Optional()
  advertisingID: string;

  @Column
  @Optional()
  screenResolution: string;

  @Column
  @Optional()
  cameraInformation: string;

  @BelongsTo(() => User)
  users: User[];

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @Optional()
  @ForeignKey(() => User)
  userID: number;
}

export interface FindFeedQuery {
  limit?: number;
  offset?: number;
}

export interface FindAllQuery extends FindFeedQuery {
  user?: string;
  model: string;
  androidVersion?: string;
  totalRAM?: string;
  freeRAM?: string;
  card?: string;
  storage?: string;
}

export interface DeviceResponse {
  manufacturer: string;
  model: string;
  androidVersion: string;
  totalRAM: string;
  freeRAM: string;
  totalCardStorage: string;
  totalInternalStorage: string;
  sensors: string[];
  installedApps: string[];
  advertisingID: string;
  screenResolution: string;
  cameraInformation: string;
  userID: number;
}
