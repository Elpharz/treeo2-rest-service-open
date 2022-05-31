import { UserProjectType } from './gql/userProjectType';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { UserProjectsService } from './user-projects.service';

@Resolver()
export class UserProjectResolver {
  constructor(private readonly userProjectsService: UserProjectsService) {}

  @Query(() => [UserProjectType])
  async searchUserProjects(@Args('key') key?: string) {
    let result = await this.userProjectsService.findAll();
    return result;
  }
}
