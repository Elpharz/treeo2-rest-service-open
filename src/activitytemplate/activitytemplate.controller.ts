import {
  Controller,
  Get,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ActivitytemplateService } from './activitytemplate.service';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';

@Controller('activitytemplate')
export class ActivitytemplateController {
  constructor(
    private readonly activitytemplateService: ActivitytemplateService,
    private readonly permissionCheckService: PermissionCheckService,
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Get all Activity templates' })
  @UseGuards(JwtAuthGuard)
  async getAllActivities(@Req() req) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99014,
    );
    if (access) {
      return this.activitytemplateService.findAll(req);
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }
}
