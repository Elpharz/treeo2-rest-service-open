import { ProjectType } from './../../projects/gql/projectType';
import { Role } from './../../roles/roles.model';
import { User } from './../../auth/interfaces/google.service.interface';
import { Project } from './../../projects/projects.model';
import { RoleType } from './../../roles/gql/roleType';
import { UserType } from './../../users/gql/userType';
import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
export class UserProjectType {
  @Field({ nullable: true })
  projectID: number;

  @Field(() => UserType)
  userID: number;

  @Field(() => RoleType)
  roleID: number;

  @Field({ nullable: true })
  valid_from: string;

  @Field({ nullable: true })
  valid_to: string;

  @Field(() => ProjectType, { nullable: true })
  project: Project;

  @Field(() => UserType)
  user: User;

  @Field(() => RoleType, { nullable: true })
  role: Role;
}
