import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { Measurement } from './measurement.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ActivityModule } from '../activity/activity.module';
import { PlotModule } from '../plot/plot.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    SequelizeModule.forFeature([Measurement]),
    ActivityModule,
    PlotModule,
    HttpModule,
  ],
  providers: [MeasurementService],
  controllers: [MeasurementController],
  exports: [MeasurementService, SequelizeModule],
})
export class MeasurementModule {}
