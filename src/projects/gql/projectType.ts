import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OrganizationType } from '../../organizations/gql/organizationType';
import { Organization } from '../../organizations/organizations.model';

@ObjectType()
export class ProjectType {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  projectStatus?: string;

  @Field(() => Int, { nullable: false })
  organizationID?: number;

  @Field(() => OrganizationType, { nullable: false })
  organization?: Organization;
}
