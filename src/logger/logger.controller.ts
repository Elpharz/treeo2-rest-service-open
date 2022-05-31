import { Controller, Post, Get, Req } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { UserDeco } from '../users/user.decorator';

@Controller('logs')
export class LoggerController {
  constructor(private loggerService: LoggerService) {}

  @Post('create-log')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Create logs' })
  async createLog(@UserDeco() user: User, @Req() req) {
    return this.loggerService.auditTrail(user, req);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Get logs' })
  async getLogs() {
    let res = this.loggerService.getLogs();
    return res;
  }

  @Get('/user/:id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Get user data activity report' })
  async getUserActivityDataReport(@Req() Req) {
    let res = this.loggerService.getUserActivityReport(
      Req.params.id,
      Req.query.from,
      Req.query.to,
    );
    return res;
  }
}
