import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { RoleType } from './gql/roleType';
import { RolesService } from './roles.service';

@Resolver()
export class RolesResolver {
  constructor(private readonly roleService: RolesService) {}

  @Query(() => [RoleType])
  async roles() {
    return await this.roleService.findAll();
  }

  @Query(() => RoleType)
  async getRoleById(@Args('id', { type: () => Int }) id: number) {
    return this.roleService.findOne(id);
  }

  @Query(() => RoleType)
  async getRoleByName(@Args('name', { type: () => String }) name: string) {
    return this.roleService.findOneByName(name);
  }
}
