import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeviceService } from './device.service';
import { UserDeco } from '../users/user.decorator';
import { User } from '../users/users.model';
import { CreateDeviceDTO } from './dto/create-deviceDTO';
import {
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';

@Controller('device-info')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  @ApiOkResponse({ description: 'Retrieve all device information' })
  async getDeviceInfo() {
    const res = await this.deviceService.findAllDeviceInfo();
    return {
      data: {
        deviceInfo: res,
      },
      message: 'success',
    };
  }

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Post device information' })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: CreateDeviceDTO })
  @UseGuards(JwtAuthGuard)
  async deviceInfo(
    @UserDeco() user: User,
    @Body() deviceData: CreateDeviceDTO,
  ) {
    const res = await this.deviceService.deviceInfo(user, deviceData);
    return {
      data: {
        deviceInfo: res,
      },
      message: 'success',
    };
  }

  @Get('/user')
  @ApiOkResponse({
    description: 'Get a single device information using userID',
  })
  @UseGuards(JwtAuthGuard)
  async getUserDeviceInformation(@Req() req) {
    const device = await this.deviceService.getUserDeviceInformation(
      req.user.id,
    );
    if (device) {
      return {
        data: device,
        message: 'Found user device',
      };
    }
    return {
      data: '',
      message: 'user device not found',
    };
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get a signle device using device id' })
  @UseGuards(JwtAuthGuard)
  getSingleDevice(@Param('id') deviceID: string) {
    return this.deviceService.findOne(deviceID);
  }
}
