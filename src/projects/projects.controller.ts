import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProjectDTO } from './dto/create-projectDTO';
import { ReAssignProjectToOrganizationDTO } from './dto/reassign-projectDTO';
import { ProjectsService } from './projects.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projService: ProjectsService) {}

  @Post()
  @ApiOkResponse({ description: 'Create a project' })
  createProject(@Body() projData: CreateProjectDTO) {
    return this.projService.create(projData);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all projects' })
  getAllProjects() {
    return this.projService.findAll();
  }

  @Post('/reassign')
  @ApiOkResponse({ description: 'Reassign a project to an organization' })
  reAssignProject(@Body() projData: ReAssignProjectToOrganizationDTO) {
    return this.projService.ReAssignProjectToOrganization(
      projData.projectId,
      projData.orgId,
    );
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get a signle project using project id' })
  getSingleProject(@Param('id') projectID: string) {
    return this.projService.findOne(parseInt(projectID));
  }

  @Get('/all/projects')
  @ApiOkResponse({ description: 'Get a projects for specified country' })
  getProjectByCountry(@Query('country') country: string) {
    return this.projService.getProjectByCountry(country);
  }
}
