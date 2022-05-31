import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { OrganizationModule } from '../organizations/organizations.module';
import { ProjectsResolver } from './projects.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Project]), OrganizationModule],
  providers: [ProjectsService, ProjectsResolver],
  controllers: [ProjectsController],
  exports: [ProjectsService, SequelizeModule],
})
export class ProjectsModule {}
