import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePlotDTO, CreatePlotDTOV2 } from './dto/create-plotDTO';
import { PlotService } from './plot.service';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';
import { UpdatePlotDTO } from './dto/update-plotDTO';
import { UpdatePlotDTOV2 } from './dto/update-plotDTOV2';

@Controller('plots')
export class PlotController {
  constructor(
    private readonly plotService: PlotService,
    private readonly permissionCheckService: PermissionCheckService,
  ) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Get a single plot' })
  async getSinglePlot(@Param('id') plotID: string, @Req() req) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99015,
    );
    const access2 = await this.permissionCheckService.checkPermission(
      req,
      99016,
    );

    if (access && access2) {
      return this.plotService.singlePlot(
        parseInt(plotID),
        'assignedAndUnAssigned',
      );
    }

    if (access2) {
      return this.plotService.singlePlot(parseInt(plotID), 'assigned');
    }
    if (access) {
      return this.plotService.singlePlot(parseInt(plotID), 'unAssigned');
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }

  @Post('/create/polygon')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Create polygon' })
  createPlotPolygon(@Body() plotData: CreatePlotDTO, @Req() req) {
    return this.plotService.createPlot(plotData);
  }

  @Post('/v2/create/polygon')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Create polygon v2' })
  createPlotPolygonV2(@Body() plotData: CreatePlotDTOV2) {
    return this.plotService.createPlot(plotData);
  }

  @Post('/create/point')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Create point' })
  createPlotPoint(@Body() plotData: CreatePlotDTO, @Req() req) {
    return this.plotService.createPoint(plotData, req.user.id);
  }

  @Get('/externalId/:id')
  @ApiOkResponse({ description: 'Get a plot or polygon by externalId' })
  @UseGuards(JwtAuthGuard)
  getPlotByExternalId(@Param('id') externalID: string) {
    return this.plotService.findByExternalId(externalID);
  }

  @Get('/user/plots')
  @ApiOkResponse({ description: 'Get all plot information for user' })
  @UseGuards(JwtAuthGuard)
  getAllPlotsForUser(@Req() req) {
    return this.plotService.getAllPlotsForUser(req.user.id);
  }

  @Get('/user/all/plots')
  @ApiOkResponse({ description: 'Get all plot information' })
  @UseGuards(JwtAuthGuard)
  getAllPlotPoints() {
    return this.plotService.getAllPlotPoints();
  }

  @Get('/delete/:id')
  @ApiOkResponse({ description: 'Delete Plot' })
  deletePlot(@Param('id') plotID: string) {
    return this.plotService.remove(parseInt(plotID));
  }

  @Get('/all/available')
  @ApiOkResponse({ description: 'Get all plots' })
  @UseGuards(JwtAuthGuard)
  async getPlots(@Query() query, @Req() req) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99015,
    );
    const access2 = await this.permissionCheckService.checkPermission(
      req,
      99016,
    );
    if (access && access2) {
      return this.plotService.getAllPlotProjectsData(
        query,
        'assignedAndUnAssigned',
      );
    }
    if (access2) {
      return this.plotService.getAllPlotProjectsData(query, 'assigned');
    }
    if (access) {
      return this.plotService.getAllPlotProjectsData(query, 'unAssigned');
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }

  @Post('/filter')
  @ApiOkResponse({ description: 'Filter plots' })
  @UseGuards(JwtAuthGuard)
  async filterPlotProjects(@Body() plotProjectFilterData, @Req() req) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99015,
    );
    const access2 = await this.permissionCheckService.checkPermission(
      req,
      99016,
    );
    if (access && access2) {
      return this.plotService.filterPlots(
        plotProjectFilterData,
        'assignedAndUnAssigned',
      );
    }
    if (access2) {
      return this.plotService.filterPlots(plotProjectFilterData, 'assigned');
    }
    if (access) {
      return this.plotService.filterPlots(plotProjectFilterData, 'unAssigned');
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'Update a single plot' })
  @UseGuards(JwtAuthGuard)
  async updatePlot(
    @Param('id') plotID: string,
    @Body() plotData: UpdatePlotDTO,
    @Req() req,
  ) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99018,
    );
    if (access) {
      return this.plotService.update(parseInt(plotID), plotData);
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }

  @Patch('/v2/:id')
  @ApiOkResponse({ description: 'Update a single plot v2' })
  @UseGuards(JwtAuthGuard)
  async updatePlotV2(
    @Param('id') plotID: string,
    @Body() plotData: UpdatePlotDTOV2,
    @Req() req,
  ) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99018,
    );
    if (access) {
      return this.plotService.update(parseInt(plotID), plotData);
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }
}
