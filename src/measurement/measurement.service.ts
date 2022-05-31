import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActivityService } from '../activity/activity.service';
import {
  CreateMeasurementDTO,
  measurement_status,
} from './dto/create-measurementDTO';
import { Measurement } from './measurement.model';
import sequelize from 'sequelize';
import { Plot } from '../plot/plot.model';
import { HttpService } from '@nestjs/axios';
import { Activity } from 'src/activity/activity.model';
import { BatchApproveRejectMeasurement } from './dto/update-measurementDTO';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class MeasurementService {
  logger: Logger = new Logger(MeasurementService.name);

  constructor(
    private httpService: HttpService,
    @InjectModel(Measurement) private measurementModel: typeof Measurement,
    @InjectModel(Plot) private plotModel: typeof Plot,
    private activityService: ActivityService,
  ) {}

  async findAll() {
    return this.measurementModel.findAndCountAll({
      limit: 10,
      distinct: true,
    });
  }

  async findOne(id: string) {
    const measurement = await this.measurementModel.findOne({
      where: { id },
      include: [],
    });
    if (!measurement) {
      this.logger.error(`can not find measurement ${id}`);
      return null;
    }
    return measurement;
  }

  async create(measurement: CreateMeasurementDTO) {
    const measurementId = measurement?.id;
    const measureExists = await this.measurementModel.findOne({
      where: { id: measurementId },
    });
    if (measureExists) {
      const measurementData = JSON.stringify(measurement);
      await this.updateDuplicateColumn(measurementId, measurementData);
      this.logger.warn(`Measurement already exists ${measurement.id}`);
      this.logger.debug(`Activity for measurement ${measurement?.activityID}`);
      throw new HttpException(
        'Measurement already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const activityDetails = await this.activityService.findOne(
      measurement.activityID,
    );
    measurement.gpsLocation = measurement.gpsLocation.trim();
    const tempPoint = measurement.gpsLocation
      .split(',')
      .map((meta) => String(meta).trim())
      .reverse();
    const point = {
      type: 'Point',
      coordinates: tempPoint,
      crs: { type: 'name', properties: { name: 'EPSG:4326' } },
    };

    measurement.gpscoordinates = point;
    measurement.additionalData = JSON.parse(measurement.additionalData);

    if (
      [
        'tree_measurement_auto_not_detected',
        'tree_measurement_auto_rejected',
        'tree_evidence_rejected',
      ].includes(measurement.measurement_type)
    ) {
      measurement.status = measurement_status.ignored;
    }
    const result = await this.measurementModel.create(measurement);
    await this.checkStatus(activityDetails, measurement);
    return result;
  }

  async update(measurementID: string, updateData: any) {
    const measurement = await this.findOne(measurementID);
    if (!measurement) {
      throw new NotFoundException(`measurement not found ${measurementID}`);
    }

    try {
      const result = await this.measurementModel.update(
        { ...updateData },
        { where: { id: measurementID }, returning: true },
      );
      return {
        data: result[1],
        message: 'measurement updated',
      };
    } catch (e) {
      this.logger.error(`${e}`);
      throw new HttpException(
        'not able to update',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async batchApproveReject(updateData: BatchApproveRejectMeasurement) {
    const measurements = updateData.measurements;
    measurements.forEach(async (measurement) => {
      try {
        const result = await this.update(measurement.measurementID, {
          status: measurement.status,
        });
        this.logger.debug(result.message);
      } catch (e) {
        this.logger.error(`${e}`);
      }
    });
    return {
      data: '',
      message: 'measurements updated',
    };
  }

  async checkStatus(
    activityDetails: Activity,
    measurement: CreateMeasurementDTO,
  ) {
    const count = activityDetails.measurementCount;

    const currCount = await this.findAllActivity(measurement.activityID);
    this.logger.debug(
      `currentCount ${currCount.count} expected count: ${count} for measurement ${measurement.activityID}`,
    );
    if (currCount.count <= count) {
      return lastValueFrom(
        this.httpService
          .post(
            process.env.VALIDATE_MEASUREMENT,
            {
              activityId: measurement.activityID,
              measurementCount: count,
            },
            { headers: { 'Content-Type': 'application/json' } },
          )
          .pipe(map((response) => response.data)),
      );
    }
    this.logger.warn('measurements have exceeded expected count');
  }
  async findAllActivity(activityID: string) {
    const measurements = await this.measurementModel.findAndCountAll({
      where: { activityID },
      include: [],
      distinct: true,
    });
    if (measurements.count == 0) {
      this.logger.error(`activity not found ${activityID}`);
      throw new NotFoundException('activity not found');
    }
    return measurements;
  }

  async createPolygonFromActivityMeasurements(activityID: string) {
    const arr = [];
    const measurements = await this.findAllActivity(activityID);
    const measurementRows = measurements.rows;
    for (let i = 0; i < measurementRows.length; i++) {
      arr.push(
        measurementRows[i]['gpsLocation']
          .split(',')
          .map((item) => Number(item)),
      );
    }
    arr.push(arr[0]);
    const tempPolygon = [arr];
    const polygon = { type: 'Polygon', coordinates: tempPolygon };
    const owner = await this.activityService.findOne(activityID);

    const result = await this.plotModel.create({
      area: null,
      externalId: null,
      polygon: polygon,
      ownerID: owner.perfomedBy.id,
    });
    return {
      data: result,
      message: 'polygon from activity created',
    };
  }

  async changeStatusForActivityOnMeasurement(
    activityID: string,
    count: string,
  ) {
    let result: { data: Activity[]; message: string };
    let countFromDb: number;

    await this.activityService.findOne(activityID);

    countFromDb = (await this.findAllActivity(activityID)).count;

    if (parseInt(count) > 0 && parseInt(count) === countFromDb) {
      const updateActivity = { status: 'recorded' };
      result = await this.activityService.update(activityID, updateActivity);
      return {
        data: result,
        message: 'updated activity status',
      };
    }

    if (parseInt(count) === 0 || parseInt(count) > countFromDb) {
      throw new HttpException(
        'defect in activity data',
        HttpStatus.NOT_MODIFIED,
      );
    }

    // need to add condition when the count < fromActivity.count
  }

  async updateDuplicateColumn(measurementID: string, updateData: any) {
    try {
      const result = await this.measurementModel.update(
        {
          duplicateData: sequelize.fn(
            'array_append',
            sequelize.col('duplicateData'),
            updateData,
          ),
        },
        { where: { id: measurementID } },
      );
      return result;
    } catch (error) {
      this.logger.error(`${error}`);
      throw new HttpException(
        'not able to update',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async findMeasurementTypeForActivity(activityID: string) {
    const measurement_types = await this.measurementModel.findAll({
      where: { activityID: activityID },
      attributes: ['measurement_type'],
      group: ['measurement_type'],
    });
    if (!measurement_types) {
      this.logger.error(
        `measurement_types for activity id not found ${activityID}`,
      );
      throw new NotFoundException(
        'measurement_types for activity id not found',
      );
    }
    return measurement_types;
  }

  async filterMeasurementsForActivity(activityID: string, query: any) {
    const measurements = await this.measurementModel.findAndCountAll({
      where: this.measurementsQuery(
        activityID,
        query.measurement_type,
        query.status,
      ),
      order: [['dateTime', 'DESC']],
    });
    if (!measurements) {
      this.logger.error(`measurement not found ${activityID}`);
      throw new NotFoundException('measurement not found');
    }
    return measurements;
  }

  measurementsQuery(
    activityID: string,
    measuremrementType: string,
    meausurementStatus: string,
  ) {
    if (measuremrementType && meausurementStatus) {
      return {
        activityID: activityID,
        status: meausurementStatus,
        measurement_type: measuremrementType,
      };
    }
    if (!measuremrementType && meausurementStatus) {
      return {
        activityID: activityID,
        status: meausurementStatus,
      };
    }
    if (measuremrementType && !meausurementStatus) {
      return {
        activityID: activityID,
        measurement_type: measuremrementType,
      };
    }
    if (!measuremrementType && !meausurementStatus) {
      return {
        activityID: activityID,
      };
    }
    return {
      activityID: activityID,
      status: meausurementStatus,
      measurement_type: measuremrementType,
    };
  }

  async activityMeasurementsSummary(activityID: string) {
    const measurements = await this.measurementModel.findAll({
      where: { activityID },
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('status')), 'status_count'],
        'measurement_type',
        [
          sequelize.fn('COUNT', sequelize.col('measurement_type')),
          'measurement_type_count',
        ],
      ],
      group: ['measurement_type', 'status'],
    });

    if (measurements.length === 0) {
      this.logger.error(`activity not found ${activityID}`);
      throw new NotFoundException('activity not found');
    }
    return measurements;
  }
}
