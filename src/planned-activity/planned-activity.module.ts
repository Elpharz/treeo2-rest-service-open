import { forwardRef, Module } from '@nestjs/common';
import { PlannedActivityService } from './planned-activity.service';
import { PlannedActivityController } from './planned-activity.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlannedActivity } from './planned-activity.model';
import { ProjectsModule } from '../projects/projects.module';
import { PlotModule } from '../plot/plot.module';
import { UsersModule } from '../users/users.module';
import { ActivitytemplateModule } from '../activitytemplate/activitytemplate.module';

@Module({
  imports: [
    SequelizeModule.forFeature([PlannedActivity]),
    forwardRef(() => ProjectsModule),
    forwardRef(() => PlotModule),
    ActivitytemplateModule,
    forwardRef(() => UsersModule),
  ],
  providers: [PlannedActivityService],
  controllers: [PlannedActivityController],
  exports: [PlannedActivityService, SequelizeModule],
})
export class PlannedActivityModule {}
