import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Log } from './logs.model';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import sequelize, { Op } from 'sequelize';
import { User } from '../users/users.model';
import { logger } from '../logger/logger';

@Injectable()
export class LoggerService {
  constructor(
    @InjectModel(Log) private logModel: typeof Log,
    private jwtService: JwtService,
  ) {}
  createLog = async (reason, request, status, error) => {
    const logData: any = {
      reason: reason,
      host: request.headers.host,
      method: request.method,
      requestUrl: request.url,
      token: request.headers.token,
      status: status,
      error: null ? '' : error,
    };
    const log = await this.logModel.create(logData);
    return log;
  };

  // This is temporary subject for refactor after consultations.
  auditTrail = async (user: User, req) => {
    const logData: any = {
      eventType: req.body.eventType,
      viewerId: user.id,
      userViewedId: req.body.userViewedId,
      dataViewed: req.body.dataViewed,
      reason: req.body.reason,
      host: req.headers.host,
      method: req.method,
      requestUrl: req.url,
      token: req.headers.authorization,
      error: '',
      status: 'success',
    };
    logger.log('info', logData);
    return this.logModel.create<Log>(logData);
  };

  getLogs = async () => {
    const log = await this.logModel.findAll();
    return log;
  };

  getUserActivityReport = async (
    id: number,
    startDate: string,
    endDate: string,
  ) => {
    try {
      const log = await this.logModel.findAll(
        this.generateQuery(id, startDate, endDate),
      );
      if (log.length === 0) {
        throw new HttpException('No report found', HttpStatus.NOT_FOUND);
      }
      return {
        data: log,
        message: 'success',
      };
    } catch (error: any) {
      throw new HttpException(
        error.message,
        error.status === 404 ? error.status : HttpStatus.BAD_REQUEST,
      );
    }
  };

  generateQuery = (id: number, startDate: string, endDate: string) => {
    let attributes = {
      exclude: [
        'userViewedId',
        'updatedAt',
        'status',
        'email',
        'id',
        'host',
        'method',
        'requestUrl',
        'token',
        'error',
      ],
    };

    if (!id) {
      throw new HttpException(
        'Please provide the viewed user id',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!startDate && !endDate && id) {
      return {
        where: {
          userViewedId: id,
        },
        attributes: attributes,
      };
    }
    if (startDate !== '' && endDate !== '' && id) {
      return {
        where: {
          userViewedId: id,
          [Op.and]: [
            sequelize.where(
              sequelize.fn('date', sequelize.col('createdAt')),
              '>=',
              startDate,
            ),
            sequelize.where(
              sequelize.fn('date', sequelize.col('createdAt')),
              '<=',
              endDate,
            ),
          ],
        },
        attributes: attributes,
      };
    } else {
      throw new HttpException(
        'Please provide the, startdate and endDate to get range',
        HttpStatus.BAD_REQUEST,
      );
    }
  };
}
