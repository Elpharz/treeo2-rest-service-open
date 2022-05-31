import { Args, Query, Resolver } from '@nestjs/graphql';
import { ActivityType } from './gql/activityTypes';
import { ActivityService } from './activity.service';

@Resolver()
export class ActivityResolver {
  constructor(private readonly activityService: ActivityService) {}

  @Query(() => [ActivityType])
  async activities() {
    let activities = await this.activityService.findAll(null);
    return activities.rows;
  }

  @Query(() => ActivityType)
  async getActivityById(@Args('id') id: string) {
    return this.activityService.findOne(id);
  }
}
