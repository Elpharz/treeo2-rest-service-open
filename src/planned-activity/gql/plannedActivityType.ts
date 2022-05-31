import { ActivityTemplateType } from './../../activitytemplate/gql/activityTemplteType';
import { Activity } from './../../activity/dto/create-activityDTO';
import { ActivityTemplate } from './../../activitytemplate/activitytemplate.model';
import { User } from './../../auth/interfaces/google.service.interface';
import { ActivityType } from './../../activity/gql/activityTypes';
import { UserType } from './../../users/gql/userType';
import { PlotType } from './../../plot/gql/plotType';
import { Plot } from './../../plot/plot.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class PlannedActivityType {
  @Field(() => UserType)
  userID: number;

  @Field(() => PlotType)
  plotID: number;

  @Field()
  activityTemplateID: number;

  @Field()
  dueDate: string;

  @Field(() => ActivityType)
  activityID: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => UserType)
  user: User;

  @Field(() => PlotType)
  plot: Plot;

  @Field(() => ActivityTemplateType, { nullable: true })
  activityTemplate: ActivityTemplate;

  @Field(() => ActivityType)
  completedByActivity: Activity;
}
