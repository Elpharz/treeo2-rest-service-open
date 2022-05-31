import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './gql/userType';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [UserType])
  async users() {
    let result = await this.userService.findAll();
    return result.rows;
  }

  @Query(() => UserType)
  async getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Query(() => [UserType])
  async filterUsers(
    @Args('firstName', { nullable: true }) firstName?: string,
    @Args('lastName', { nullable: true }) lastName?: string,
    @Args('email', { nullable: true }) email?: string,
    @Args('status', { nullable: true }) status?: string,
  ) {
    let result = await this.userService.filterUserOrganization(
      firstName,
      lastName,
      email,
      status,
    );
    let finalResult = this.userService.organizeData(result.rows);
    return finalResult;
  }

  @Query(() => [UserType])
  async searchUsers(@Args('key') key?: string) {
    let result = await this.userService.searchUsers(key);
    let finalResult = this.userService.organizeData(result.rows);
    return finalResult;
  }
}
