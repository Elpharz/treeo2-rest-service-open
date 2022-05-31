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
export class TreeSpecies extends Model {
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  @Column({ type: DataType.FLOAT, defaultValue: null })
  version: number;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  matureDbhCm: number;

  @Column({ type: DataType.STRING, unique: true, defaultValue: null })
  code: string;

  @Column({ type: DataType.STRING, unique: true, defaultValue: null })
  latinName: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  matureAge: string;

  @Column({ type: DataType.JSONB, defaultValue: null })
  trivialName: any;

  @Column({ type: DataType.JSONB, defaultValue: null })
  description: any;

  @Column({ type: DataType.JSONB, defaultValue: null })
  benefits: any;

  @Column({ type: DataType.TEXT, defaultValue: null })
  iconURL: string;

  @Column({ type: DataType.TEXT, defaultValue: null })
  agbBiomassFormula: string;

  @Column({ type: DataType.TEXT, defaultValue: null })
  agbCo2Formula: string;

  @Column({ type: DataType.ARRAY(DataType.TEXT), defaultValue: null })
  picturesURL: any;

  @Column({ type: DataType.ARRAY(DataType.TEXT), defaultValue: null })
  terrestialRegions: any;

  @BelongsTo(() => User)
  modifiedBy: User;

  @Column({ type: DataType.INTEGER, defaultValue: null })
  @ForeignKey(() => User)
  modifiedById: number;
}
