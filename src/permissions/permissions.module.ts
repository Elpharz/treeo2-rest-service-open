import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission } from './permissions.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Permission])],
  providers: [PermissionsService],
  controllers: [PermissionsController],
  exports: [PermissionsService, SequelizeModule],
})
export class PermissionsModule {}
