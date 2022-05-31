import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserType } from '../../users/gql/userType';
import { User } from '../../users/users.model';
import { OrganizationType } from '../../organizations/gql/organizationType';
import { Organization } from '../../organizations/organizations.model';

@ObjectType()
export class RoleType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  operation?: string;

  @Field(() => Int, { nullable: true })
  code?: number;

  @Field(() => Int, { nullable: false })
  organizationID?: number;

  @Field(() => OrganizationType, { nullable: true })
  organization?: Organization;

  @Field(() => [UserType], { nullable: true })
  users?: User[];
}
