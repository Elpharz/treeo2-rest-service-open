import { forwardRef, Module } from '@nestjs/common';
import { ActivitytemplateService } from './activitytemplate.service';
import { ActivitytemplateController } from './activitytemplate.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ActivityTemplate } from './activitytemplate.model';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ActivityTemplate]),
    forwardRef(() => UsersModule),
  ],
  providers: [ActivitytemplateService, PermissionCheckService],
  controllers: [ActivitytemplateController],
  exports: [ActivitytemplateService, SequelizeModule],
})
export class ActivitytemplateModule {}
