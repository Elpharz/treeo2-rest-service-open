import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { MeasurementModule } from '../measurement/measurement.module';

@Module({
  imports: [MeasurementModule],
  providers: [PhotosService],
  controllers: [PhotosController],
})
export class PhotosModule {}
