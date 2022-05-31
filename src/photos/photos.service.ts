import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { Measurement } from '../measurement/measurement.model';
import { MeasurementService } from '../measurement/measurement.service';

@Injectable()
export class PhotosService {
  logger: Logger = new Logger(PhotosService.name);

  constructor(
    private measurementService: MeasurementService,
    @InjectModel(Measurement) private measurementModel: typeof Measurement,
  ) {}

  async addImageToMeasurement(measurementId: string, googleURL: string) {
    await this.measurementService.findOne(measurementId);
    const updateData = { additionalData: { image: googleURL } };
    const result = await this.measurementService.update(
      measurementId,
      updateData,
    );
    return result;
  }

  async appendImage(measurementId: string, updateData: any) {
    const measure = await this.measurementService.findOne(measurementId);
    if (!measure) {
      this.logger.error(
        `can not find measurement ${measurementId}, image upload likely also failed`,
      );
      throw new HttpException('measurement not found', HttpStatus.NOT_FOUND);
    }
    try {
      const result = await this.measurementModel.update(
        {
          images: sequelize.fn(
            'array_append',
            sequelize.col('images'),
            updateData,
          ),
        },
        { where: { id: measurementId } },
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'not able to update',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
