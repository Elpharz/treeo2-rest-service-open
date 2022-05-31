import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ActivityService } from './activity.service';
import { CreateActivityDTO, UpdateActivityDTO } from './dto/create-activityDTO';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';

@Controller('activities')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly permissionCheckService: PermissionCheckService,
  ) {}

  @Post()
  @ApiOkResponse({ description: 'Create an activity' })
  @UseGuards(JwtAuthGuard)
  createActivity(@Body() activityData: CreateActivityDTO, @Req() req) {
    return this.activityService.create(activityData, req.user.id);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all Activities' })
  @UseGuards(JwtAuthGuard)
  async getAllActivities(@Req() req) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99014,
    );
    if (access) {
      return this.activityService.findAll(req);
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get a single activity using activity id' })
  @UseGuards(JwtAuthGuard)
  async getSingleActivity(@Param('id') activityID: string, @Req() req) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99014,
    );
    if (access) {
      return this.activityService.findOne(activityID);
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update activity' })
  @ApiUnauthorizedResponse()
  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') activityId: string,
    @Body()
    activityData: UpdateActivityDTO,
    @Req() req,
  ): Promise<any> {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99017,
    );
    if (access) {
      const activityInfo = await this.activityService.update(
        activityId,
        activityData,
      );
      return {
        data: activityInfo,
        message: 'activity information edited successfully',
      };
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }

  @Get('all/filter')
  @ApiOkResponse({ description: 'Filter Activities' })
  @UseGuards(JwtAuthGuard)
  async filterActivities(@Query() query, @Req() req) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99014,
    );
    if (access) {
      return this.activityService.filterActivities(query, req);
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }

  @Get('all/labels')
  @ApiOkResponse({ description: 'Filter Activities' })
  @UseGuards(JwtAuthGuard)
  async activitiesLabel(@Query() query, @Req() req) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99014,
    );
    if (access) {
      return this.activityService.getAllActivitiesLabels(parseInt(query.id));
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }

  @Get('list/labels')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Get all labels' })
  async labels() {
    return this.activityService.getAllLabels();
  }
}
