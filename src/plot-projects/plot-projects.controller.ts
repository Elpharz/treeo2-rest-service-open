import {
  Body,
  Controller,
  Get,
  //   Param,
  Post,
  Req,
  Put,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePlotProjectDTO } from './dto/CreatePlotProjectDTO';
import { PlotProjectsService } from './plot-projects.service';
// import { PlotService } from './plot.service';

@Controller('plot-projects')
export class PlotProjectsController {
  constructor(private readonly plotProjectsService: PlotProjectsService) {}

  @Get('/plot-projects')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Get plot project' })
  async plotProject(@Body() plotProjectData: CreatePlotProjectDTO, @Req() req) {
    const result = await this.plotProjectsService.getPlotProjects();
    return result;
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Create plot project' })
  async createPlotProject(
    @Body() plotProjectData: CreatePlotProjectDTO,
    @Req() req,
  ) {
    const result = await this.plotProjectsService.createPlotProject(
      plotProjectData,
    );
    return result;
  }

  @Put('/update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Update plot project' })
  async updatePlotProject(
    @Body() plotProjectData: CreatePlotProjectDTO,
    @Req() req,
    @Param('id') plotProjectId: string,
  ) {
    const plotProject = await this.plotProjectsService.findById(
      parseInt(plotProjectId),
    );
    if (!plotProject) {
      throw new NotFoundException('Plot Project not found');
    }
    const result = await this.plotProjectsService.updatePlotProject(
      plotProjectData,
      parseInt(plotProjectId),
    );
    return {
      data: result,
      message: 'plotProject information edited successfully',
    };
  }
}
