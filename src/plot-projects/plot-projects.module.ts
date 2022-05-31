import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlotProjectsController } from './plot-projects.controller';
import { PlotProject } from './plot-projects.model';
import { PlotProjectsService } from './plot-projects.service';

@Module({
  imports: [SequelizeModule.forFeature([PlotProject])],
  controllers: [PlotProjectsController],
  providers: [PlotProjectsService],
  exports: [PlotProjectsService, SequelizeModule],
})
export class PlotProjectsModule {}
