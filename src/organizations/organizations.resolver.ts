import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { OrganizationType } from './gql/organizationType';
import { OrganizationService } from './organizations.service';

@Resolver()
export class OrganizationsResolver {
  constructor(private readonly orgService: OrganizationService) {}

  @Query(() => [OrganizationType])
  async organizations() {
    return await this.orgService.findAll();
  }

  @Query(() => OrganizationType)
  async getOrganizationById(@Args('id', { type: () => Int }) id: number) {
    return this.orgService.findOne(id);
  }
}
