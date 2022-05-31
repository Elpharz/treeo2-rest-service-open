import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { ProjectType } from './gql/projectType';

@Resolver()
export class ProjectsResolver {
  constructor(private readonly projService: ProjectsService) {}

  @Query(() => [ProjectType])
  async projects() {
    const result = await this.projService.findAll();
    return result.rows;
  }

  @Query(() => ProjectType)
  async getProjectById(@Args('id', { type: () => Int }) id: number) {
    return this.projService.findOne(id);
  }
}
