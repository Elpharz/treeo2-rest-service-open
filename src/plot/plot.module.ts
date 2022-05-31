import { forwardRef, Module } from '@nestjs/common';
import { PlotService } from './plot.service';
import { PlotController } from './plot.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plot } from './plot.model';
import { PlotResolver } from './plot.resolver';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Plot]), forwardRef(() => UsersModule)],
  providers: [PlotService, PlotResolver, PermissionCheckService],
  controllers: [PlotController],
  exports: [PlotService, SequelizeModule],
})
export class PlotModule {}
