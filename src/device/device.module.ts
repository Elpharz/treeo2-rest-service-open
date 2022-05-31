import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { Device } from './device.model';

import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

@Module({
  imports: [SequelizeModule.forFeature([Device]), UsersModule],
  providers: [DeviceService],
  controllers: [DeviceController],
  exports: [DeviceService, SequelizeModule],
})
export class DeviceModule {}
