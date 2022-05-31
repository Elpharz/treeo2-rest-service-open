import { PlannedActivityType } from './../../planned-activity/gql/plannedActivityType';
import { PlotType } from './../../plot/gql/plotType';
import { UserProjectType } from './../../user-projects/gql/userProjectType';
import { DeviceType } from './../../device/gql/deviceTypes';
import { PlannedActivity } from './../../planned-activity/planned-activity.model';
import { Plot } from './../../plot/plot.model';
import { UserProject } from './../../user-projects/user-project.model';
import { Device } from './../../device/device.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  preferedLogin?: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field()
  gdprAccepted: boolean;

  @Field({ nullable: true })
  preferences: string;

  @Field(() => DeviceType)
  devices: Device[];

  @Field(() => [UserProjectType], { nullable: true })
  userProject: UserProject[];

  @Field(() => PlotType)
  plot: Plot[];

  @Field(() => PlannedActivityType)
  plannedActivites: PlannedActivity[];

  @Field({ nullable: true })
  status?: string;
}
