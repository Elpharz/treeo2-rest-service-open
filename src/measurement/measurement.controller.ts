import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMeasurementDTO } from './dto/create-measurementDTO';
import {
  BatchApproveRejectMeasurement,
  UpdateMeasurementStatusDTO,
} from './dto/update-measurementDTO';
import { MeasurementService } from './measurement.service';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Get()
  @ApiOkResponse({ description: 'Get all Measurements' })
  @UseGuards(JwtAuthGuard)
  getAllMeasurements() {
    return this.measurementService.findAll();
  }

  @Post()
  @ApiOkResponse({ description: 'create a measurement' })
  @UseGuards(JwtAuthGuard)
  createMeasurement(@Body() measurementData: CreateMeasurementDTO) {
    return this.measurementService.create(measurementData);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get a measurement measurement using measurement id',
  })
  @UseGuards(JwtAuthGuard)
  async getSingleMeasurement(@Param('id') measurementID: string) {
    const result = await this.measurementService.findOne(measurementID);
    if (!result) {
      throw new NotFoundException('measurement not found');
    }
    return result;
  }

  @Get('/activity/:id')
  @ApiOkResponse({
    description: 'Get list of measurements for single activity',
  })
  @UseGuards(JwtAuthGuard)
  getListOfMeasurementsForActivity(@Param('id') activityID: string) {
    return this.measurementService.findAllActivity(activityID);
  }

  @Post('/activity/count/:id/:count')
  @HttpCode(200)
  @ApiExcludeEndpoint()
  getListOfMeasurementsAndCount(
    @Param('id') activityID: string,
    @Param('count') count: string,
  ) {
    return this.measurementService.changeStatusForActivityOnMeasurement(
      activityID,
      count,
    );
  }

  @Get('plot/create/activity/:id')
  @ApiOkResponse({ description: 'Create Polygon/Plot from measurements' })
  @UseGuards(JwtAuthGuard)
  getAllPlotsFromActivity(@Param('id') activityID: string) {
    return this.measurementService.createPolygonFromActivityMeasurements(
      activityID,
    );
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'Update a single measurement status' })
  @UseGuards(JwtAuthGuard)
  updateMeasurementStatus(
    @Param('id') measurementID: string,
    @Body() measurementUpdateData: UpdateMeasurementStatusDTO,
  ) {
    return this.measurementService.update(measurementID, measurementUpdateData);
  }

  @Get('/measurements_types/activity/:id')
  @ApiOkResponse({
    description: 'Get measurements types for particular activity',
  })
  @UseGuards(JwtAuthGuard)
  getMeasuremntTypesForActivity(@Param('id') activityID: string) {
    return this.measurementService.findMeasurementTypeForActivity(activityID);
  }

  @Get('/activity/:id/filter')
  @ApiOkResponse({
    description: 'Filter measurements for a particular activity',
  })
  @UseGuards(JwtAuthGuard)
  filterMeasuremntForActivity(@Param('id') activityID: string, @Query() query) {
    return this.measurementService.filterMeasurementsForActivity(
      activityID,
      query,
    );
  }

  @Get('/activity/:id/summary')
  @ApiOkResponse({
    description: 'Get a Activity measurement summary using measurement id',
  })
  @UseGuards(JwtAuthGuard)
  activityMeasurementsSummary(@Param('id') activityID: string) {
    return this.measurementService.activityMeasurementsSummary(activityID);
  }

  @Patch('/v2/batch-status-update')
  @ApiOkResponse({ description: 'Batch update measurement status' })
  @UseGuards(JwtAuthGuard)
  batchApproveRejectMeasurements(
    @Body() measurementUpdateData: BatchApproveRejectMeasurement,
  ) {
    return this.measurementService.batchApproveReject(measurementUpdateData);
  }
}
