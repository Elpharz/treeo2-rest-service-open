import { ActivityResolver } from './activity.resolver';
import { PermissionCheckService } from './../auth/permisssions/checkPermissions';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeviceModule } from '../device/device.module';
import { ActivityController } from './activity.controller';
import { Activity } from './activity.model';
import { ActivityService } from './activity.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { PlotProjectsModule } from '../plot-projects/plot-projects.module';
import { PlotProjectsService } from '../plot-projects/plot-projects.service';
import { PlotService } from '../plot/plot.service';
import { PlotModule } from '../plot/plot.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Activity]),
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    DeviceModule,
    PlotProjectsModule,
    PlotModule,
  ],
  controllers: [ActivityController],
  providers: [
    ActivityService,
    PermissionCheckService,
    ActivityResolver,
    PlotProjectsService,
    PlotService,
  ],
  exports: [ActivityService, SequelizeModule],
})
export class ActivityModule {}
