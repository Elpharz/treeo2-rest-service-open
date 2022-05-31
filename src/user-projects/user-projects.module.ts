import { Module } from '@nestjs/common';
import { UserProject } from './user-project.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { UserProjectsService } from './user-projects.service';
import { UserProjectsController } from './user-projects.controller';
import { RolesModule } from '../roles/roles.module';
import { PlannedActivityModule } from '../planned-activity/planned-activity.module';
import { UserProjectResolver } from './user-project.resolver';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';

@Module({
  imports: [
    SequelizeModule.forFeature([UserProject]),
    UsersModule,
    ProjectsModule,
    RolesModule,
    PlannedActivityModule,
  ],
  exports: [UserProjectsService, SequelizeModule],
  providers: [UserProjectsService, UserProjectResolver, PermissionCheckService],
  controllers: [UserProjectsController],
})
export class UserProjectsModule {}
