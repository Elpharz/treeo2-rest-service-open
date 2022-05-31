import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Activity } from '../activity/activity.model';
import { Plot } from '../plot/plot.model';
import { Project } from '../projects/projects.model';

import { CreatePlotProjectDTO } from './dto/CreatePlotProjectDTO';
import { PlotProject } from './plot-projects.model';

@Injectable()
export class PlotProjectsService {
  constructor(
    @InjectModel(PlotProject) private PlotProjectModel: typeof PlotProject,
  ) {}
  async getPlotProjects() {
    const result = await this.PlotProjectModel.findAndCountAll({
      distinct: true,
      include: [
        {
          model: Project,
        },
        {
          model: Plot,
          include: [
            {
              model: Activity,
            },
          ],
        },
      ],
    });
    if (!result) {
      throw new NotFoundException('no plot project information found');
    }
    return result;
  }

  async createPlotProject(plotProject: CreatePlotProjectDTO) {
    const result = await this.PlotProjectModel.create(plotProject);
    return result;
  }

  async findById(id: number): Promise<any> {
    return this.PlotProjectModel.findOne({
      where: { id },
    });
  }

  async updatePlotProject(plotProject: any, id: number) {
    const result = await this.PlotProjectModel.update(plotProject, {
      where: { id },
      returning: true,
    });
    return result;
  }
}
