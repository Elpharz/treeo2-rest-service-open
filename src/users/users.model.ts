import { Optional } from '@nestjs/common';
import {
  Column,
  Index,
  Model,
  Table,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { UserProject } from '../user-projects/user-project.model';
import { Device } from '../device/device.model';
import { Plot } from '../plot/plot.model';
import { PlannedActivity } from '../planned-activity/planned-activity.model';
import { TreeSpecies } from '../tree-species/tree-species.model';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  @Optional()
  password: string;

  @Column
  @Index({ unique: true })
  email: string;

  @Column({ unique: true })
  @Optional()
  phoneNumber: string;

  @Column
  @Optional()
  country: string;

  @Column({ unique: true })
  @Optional()
  username: string;

  @Column({ defaultValue: false })
  @Optional()
  isActive: boolean;

  @Column
  @Optional()
  preferedLogin: string;

  @Column
  @Optional()
  public refreshToken?: string;

  @Column({ defaultValue: false })
  gdprAccepted: boolean;

  @Column({ type: DataType.JSONB, defaultValue: null })
  @Optional()
  preferences: any;

  @HasMany(() => Device)
  devices: Device[];

  @HasMany(() => TreeSpecies)
  treeSpecies: TreeSpecies[];

  @HasMany(() => UserProject)
  userProject: UserProject[];

  @HasMany(() => Plot)
  plot: Plot[];

  @HasMany(() => PlannedActivity)
  plannedActivites: PlannedActivity[];

  @Column({
    type: DataType.ENUM,
    values: ['active', 'inactive', 'pending', 'deactivated'],
    defaultValue: 'inactive',
  })
  @Optional()
  status: string;
}
