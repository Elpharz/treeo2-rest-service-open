import {
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  Req,
  Body,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdatePlannedActivityDTO } from './dto/update-planned-activityDTO';
import { PlannedActivityService } from './planned-activity.service';
import {
  AssignPlannedActivityDTO,
  CreatePlannedActivityDTO,
} from './dto/create-planned-ActivityDTO';

@Controller('planned-activity')
export class PlannedActivityController {
  constructor(
    private readonly plannedActivityService: PlannedActivityService,
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Get all planned activities' })
  getAllPlannedActivities() {
    return this.plannedActivityService.findAll();
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Get all planned activity assigned to user' })
  getPlannedActivitiesAssignedToUser(@Req() req) {
    return this.plannedActivityService.getPlannedActivitiesAssignedToUser(
      parseInt(req.user.id),
    );
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'Update a planned activity' })
  @UseGuards(JwtAuthGuard)
  async updatePlannedActivity(
    @Param('id') plannedActivityID: string,
    @Body() plannedData: UpdatePlannedActivityDTO,
  ) {
    return this.plannedActivityService.update(+plannedActivityID, plannedData);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Get a single planned activity' })
  getSinglePlannedActivity(@Param('id') plannedActivityID: string) {
    return this.plannedActivityService.findOne(parseInt(plannedActivityID));
  }

  @Get('/user/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Get a single planned activity' })
  getUserPlannedActivities(@Param('id') userId: string, @Req() req) {
    return this.plannedActivityService.getUserplannedActivities(
      parseInt(userId),
      req,
    );
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Create planned activity',
  })
  createPlannedActivity(@Body() plannedData: CreatePlannedActivityDTO) {
    return this.plannedActivityService.create(plannedData);
  }

  @Post('/assign/plot')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Assign a user planned activity using plot ID',
  })
  assignUserPlannedActivityUsingPlotID(
    @Body() plannedData: AssignPlannedActivityDTO,
  ) {
    return this.plannedActivityService.assignUserPlannedActivityUsingProjectID(
      plannedData,
    );
  }
}
