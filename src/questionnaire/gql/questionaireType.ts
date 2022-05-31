import { ProjectType } from './../../projects/gql/projectType';
import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
export class QuestionaireType {
  @Field(() => ProjectType)
  projectID: number;

  @Field()
  configuration: string;
}
