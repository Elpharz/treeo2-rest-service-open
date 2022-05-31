import { Optional } from '@nestjs/common';
import { Column, Index, Model, Table } from 'sequelize-typescript';

@Table
export class Log extends Model<Log> {
  @Column
  @Optional()
  eventType: string;

  @Column
  @Optional()
  userViewedId: number;

  @Column
  @Optional()
  viewerId: number;

  @Column
  dataViewed: string;

  @Column
  reason: string;

  @Column
  host: string;

  @Column
  method: string;

  @Column
  requestUrl: string;

  @Column
  token: string;

  @Column
  @Optional()
  error: string; // This can be handled by status as a `success` or `fail`.

  @Column
  status: string;
}
