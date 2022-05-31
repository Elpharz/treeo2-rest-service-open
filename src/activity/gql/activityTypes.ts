import { ActivityTemplateType } from './../../activitytemplate/gql/activityTemplteType';
import { User } from '../../users/users.model';
import { UserType } from '../../users/gql/userType';
import { Measurement } from './../dto/create-activityDTO';
import { Device } from './../../device/device.model';
import { Questionnaire } from './../../questionnaire/questionnaire.model';
import { Plot } from './../../plot/plot.model';
import { ActivityTemplate } from './../../activitytemplate/activitytemplate.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';
// import { PlotType } from '../plot/gql/plotType';
import { PlotType } from '../../plot/gql/plotType';

@ObjectType()
export class ActivityType {
  @Field()
  id: string;

  @Field()
  activityTemplateID: string;

  @Field(() => UserType)
  userID: User;

  @Field({ nullable: true })
  plotID: number;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field()
  synced: string;

  @Field()
  restarted: number;

  @Field()
  mobileAppVersion: string;

  @Field({ nullable: true })
  outsidePolygon?: string;

  @Field()
  fullyCompleted?: boolean;

  @Field({ nullable: true })
  labels: string;

  @Field({ nullable: true })
  comment?: string;

  @Field({ nullable: true })
  commentAudio?: string;

  @Field({ nullable: true })
  totalSteps?: number;

  @Field()
  preQuestionnaireData?: string;

  @Field()
  preQuestionnaireID?: number;

  @Field()
  postQuestionnaireID?: number;

  @Field()
  postQuestionnaireData?: string;

  @Field()
  deviceInformationID?: string;

  @Field(() => ActivityTemplateType)
  activityTemplate?: number;

  @Field(() => UserType)
  perfomedBy?: UserType;

  @Field()
  measurement?: string;

  @Field(() => PlotType, { nullable: true })
  plot?: Plot;
}
