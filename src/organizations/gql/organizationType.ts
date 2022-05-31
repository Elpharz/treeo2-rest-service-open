import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserType } from '../../users/gql/userType';
import { User } from '../../users/users.model';
import { ProjectType } from '../../projects/gql/projectType';
import { Project } from '../../projects/projects.model';
import { Role } from '../../roles/roles.model';
import { RoleType } from '../../roles/gql/roleType';

@ObjectType()
export class OrganizationType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  country: string;

  @Field(() => Int, { nullable: true })
  code?: number;

  @Field(() => [ProjectType], { nullable: true })
  projects?: Project[];

  @Field(() => [UserType], { nullable: true })
  users?: User[];

  @Field(() => [RoleType], { nullable: true })
  roles?: Role[];
}
