import { QuestionaireType } from './../../questionnaire/gql/questionaireType';
import { Questionnaire } from './../../questionnaire/questionnaire.model';
import { ProjectType } from './../../projects/gql/projectType';
import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class ActivityTemplateType {
  @Field()
  activityType: string;

  @Field()
  code: number;

  @Field({ nullable: true })
  configuration: string;

  @Field(() => QuestionaireType)
  pre_questionnaireID: number;

  @Field(() => QuestionaireType)
  post_questionnaireID: number;

  @Field(() => ProjectType)
  projectID: number;

  @Field(() => QuestionaireType)
  questionnaire: Questionnaire;
}
