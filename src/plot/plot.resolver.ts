import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PlotType } from './gql/plotType';
import { PlotService } from './plot.service';

@Resolver()
export class PlotResolver {
  constructor(private readonly plotService: PlotService) {}

  @Query(() => [PlotType])
  async getAllPlots() {
    const result = await this.plotService.getAllPlotPoints();
    return result.rows;
  }
}
