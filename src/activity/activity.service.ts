import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActivityTemplate } from '../activitytemplate/activitytemplate.model';
import { User } from '../users/users.model';
import { DeviceService } from '../device/device.service';
import { Activity } from './activity.model';
import { CreateActivityDTO } from './dto/create-activityDTO';
import { Measurement } from '../measurement/measurement.model';
import sequelize, { Op } from 'sequelize';
import { UserProject } from '../user-projects/user-project.model';
import { Project } from '../projects/projects.model';
import { Organization } from '../organizations/organizations.model';
import { Plot } from '../plot/plot.model';
import { PlotProject } from '../plot-projects/plot-projects.model';
import {
  getNextPage,
  getOffset,
  getPage,
  getPreviousPage,
  getSize,
  sortOrder,
  sortParam,
} from '../core/paginationAndSorting';
@Injectable()
export class ActivityService {
  logger: Logger = new Logger(ActivityService.name);
  constructor(
    @InjectModel(Activity) private ActivityModel: typeof Activity,
    private deviceService: DeviceService,
  ) {}

  async findAll(req: any) {
    let page = getPage(req);
    let size = getSize(req);

    const data = await this.ActivityModel.findAndCountAll({
      limit: size,
      offset: getOffset(page, size),
      distinct: true,
      attributes: {
        exclude: ['updatedAt', 'activityTemplateID', 'userID'],
      },
      order: [[sortParam(req.query), sortOrder(req.query)]],
      include: [
        {
          model: ActivityTemplate,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: User,
          attributes: {
            exclude: [
              'password',
              'preferedLogin',
              'refreshToken',
              'isActive',
              'gdprAccepted',
              'preferences',
              'createdAt',
              'updatedAt',
              'email',
            ],
          },
        },
      ],
    });

    return {
      limit: size,
      currentPage: page,
      previouspage: getPreviousPage(page),
      nextpage: getNextPage(page, size, data.count),
      totalPages: Math.ceil(data.count / size),
      rows: data.rows,
    };
  }

  async findOne(id: string): Promise<Activity> {
    try {
      const singleActivity = await this.ActivityModel.findOne({
        where: { id },
        include: [
          {
            model: User,
            attributes: {
              exclude: [
                'password',
                'preferedLogin',
                'refreshToken',
                'isActive',
                'gdprAccepted',
                'preferences',
                'createdAt',
                'updatedAt',
                'email',
              ],
            },
          },
          {
            model: ActivityTemplate,
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          {
            model: Measurement,
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        ],
      });
      if (!singleActivity) {
        this.logger.error(`Activity not found ${id}`);
        throw new NotFoundException('Activity not found');
      }
      return singleActivity;
    } catch (error) {
      if (error.message.indexOf('invalid input syntax for type uuid') !== -1) {
        this.logger.error(`UUID field should be of type UUID -- ${error}`);
        throw new HttpException(
          'Wrong uuid for activity',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (error.message === 'Activity not found') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  async create(activity: CreateActivityDTO, userID: number) {
    const activityExists = await this.ActivityModel.findOne({
      where: { id: activity.activity?.id },
    });
    if (activityExists) {
      const activityData = JSON.stringify(activity.activity);
      await this.updateDuplicateColumn(activity.activity?.id, activityData);
      this.logger.error(`Activity already exists ${activity.activity?.id}`);
      throw new HttpException('Activity already exists', HttpStatus.CONFLICT);
    }

    activity.activity.userID = userID;

    if (activity.activity.note) {
      activity.activity.note = this.escapeHtml(activity.activity.note);
    }

    activity.activity.synced = new Date().toLocaleString();
    activity.activity.startDate = new Date(
      activity.activity.startDate,
    ).toLocaleString();
    activity.activity.endDate = new Date(
      activity.activity.endDate,
    ).toLocaleString();

    let deviceID = null;
    const device = await this.deviceService.getUserDeviceInformation(userID);

    if (device) {
      deviceID = device.id;
    }

    const polygon = {
      type: 'Polygon',
      coordinates: activity.activity.outsidePolygon,
      crs: { type: 'name', properties: { name: 'EPSG:4326' } },
    };
    activity.activity.outsidePolygon = polygon;
    activity.activity.deviceInformationID = deviceID;

    try {
      const createdActivity = await this.ActivityModel.create(
        activity.activity,
      );
      return {
        data: { activity: createdActivity },
        message: 'created activity',
      };
    } catch (e) {
      console.log(e);
      this.logger.error(`Failed to create activity ${e}`);
      throw new HttpException(
        'not able to update',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async update(activityID: string, updateData: any) {
    await this.findOne(activityID);

    try {
      const result = await this.ActivityModel.update(
        { ...updateData },
        { where: { id: activityID }, returning: true },
      );
      return {
        data: result[1],
        message: 'activity updated',
      };
    } catch (e) {
      console.log(e);
      this.logger.error(`Failed to update activity ${e}`);
      throw new HttpException(
        'not able to update',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateDuplicateColumn(activityID: string, updateData: any) {
    try {
      const result = await this.ActivityModel.update(
        {
          duplicateData: sequelize.fn(
            'array_append',
            sequelize.col('duplicateData'),
            updateData,
          ),
        },
        { where: { id: activityID } },
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'not able to update',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  async filterActivities(activityFilterData: any, req: any) {
    try {
      let page = getPage(req);
      let size = getSize(req);

      let result: any = await this.ActivityModel.findAndCountAll({
        limit: size,
        offset: getOffset(page, size),
        distinct: true,
        attributes: {
          exclude: ['updatedAt', 'activityTemplateID', 'userID'],
        },
        order: [[sortParam(req.query), sortOrder(req.query)]],
        where: this.activityQuery(
          parseInt(activityFilterData.plotId),
          activityFilterData.status,
          activityFilterData.label,
        ),
        include: [
          {
            model: ActivityTemplate,
            where: this.activityTypeQuery(activityFilterData.activityType),
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          {
            model: User,
            where: this.usersQuery(
              activityFilterData.nameKeyword,
              parseInt(activityFilterData.userId),
            ),
            attributes: {
              exclude: [
                'password',
                'preferedLogin',
                'refreshToken',
                'isActive',
                'gdprAccepted',
                'preferences',
                'createdAt',
                'updatedAt',
                'email',
              ],
            },
          },
          {
            model: Plot,
            include: [
              {
                model: PlotProject,
                include: [
                  {
                    model: Project,
                    where: this.projectQuery(
                      parseInt(activityFilterData.projectId),
                    ),
                  },
                ],
              },
            ],
          },
        ],
      });

      let fiteredData = parseInt(activityFilterData.projectId)
        ? this.filterWhenProjectsIsSpecified(result.rows)
        : result;
      return {
        limit: size,
        currentPage: page,
        previouspage: getPreviousPage(page),
        nextpage: getNextPage(page, size, fiteredData.count),
        totalPages: Math.ceil(fiteredData.count / size),
        rows: fiteredData.rows,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  filterWhenProjectsIsSpecified(data: any) {
    let result = [];
    result = data.filter((item) => {
      return item.plot && item.plot.plotProject.length !== 0;
    });
    const finalResult = {
      count: result.length,
      rows: result,
    };
    return finalResult;
  }

  activityQuery(plotId: number, status: string, label: string) {
    const checkStatus = this.acitvityStatus();
    if (status && checkStatus.includes(status) && plotId && label) {
      return {
        plotID: plotId,
        status: status,
        labels: { [Op.contains]: [label] },
      };
    }
    if (status && checkStatus.includes(status) && plotId && !label) {
      return {
        plotID: plotId,
        status: status,
      };
    }
    if (status && checkStatus.includes(status) && !plotId && label) {
      return {
        status: status,
        labels: { [Op.contains]: [label] },
      };
    }
    if (!status && !checkStatus.includes(status) && plotId && label) {
      return {
        plotID: plotId,
        labels: { [Op.contains]: [label] },
      };
    }
    if (status && checkStatus.includes(status) && !plotId && !label) {
      return {
        status: status,
      };
    }
    if (!status && !checkStatus.includes(status) && plotId && !label) {
      return {
        plotID: plotId,
      };
    }
    if (!status && !checkStatus.includes(status) && !plotId && label) {
      return {
        labels: { [Op.contains]: [label] },
      };
    }
    if (!status && !checkStatus.includes(status) && !plotId && !label) {
      return {};
    }
    return {
      plotID: plotId,
      status: status,
      labels: { [Op.contains]: [label] },
    };
  }

  projectQuery(projectId: number) {
    if (projectId) {
      return {
        id: projectId,
      };
    }
    return {};
  }

  activityTypeQuery(activityType: string) {
    if (
      activityType &&
      ['questionnaire', 'land_survey', 'tree_monitoring'].includes(activityType)
    ) {
      return {
        activityType: activityType,
      };
    }
    return {};
  }

  usersQuery(nameKeyword: string, userId: number) {
    if (userId) {
      return { id: userId };
    }

    if (nameKeyword) {
      return {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${nameKeyword}%` } },
          { lastName: { [Op.iLike]: `%${nameKeyword}%` } },
          { email: { [Op.iLike]: `%${nameKeyword}%` } },
        ],
      };
    }
    return {};
  }

  async getAllActivitiesLabels(id: number) {
    try {
      let results = await this.ActivityModel.findAndCountAll({
        limit: 60,
        distinct: true,
        include: [
          {
            model: User,
            include: [
              {
                model: UserProject,
                include: [
                  {
                    model: Project,
                    include: [
                      {
                        model: Organization,
                        where: this.lableActivityQuery(id),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      return this.filterLableActivity(results.rows, id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  lableActivityQuery(organizationId) {
    if (organizationId) {
      return {
        id: organizationId,
      };
    }
    return {};
  }

  filterLableActivity(data: any, id: number) {
    let result = [];
    if (id) {
      result = data.filter((item) => {
        let res = item.perfomedBy.userProject.filter((item) => {
          return item.project && item.project.organizationID === id;
        });
        return res.length !== 0;
      });
    } else {
      result = data;
    }
    let labelResults = [];
    result.forEach((item) => {
      labelResults = [...new Set([...labelResults, ...item.labels])];
    });
    return labelResults;
  }

  async getAllLabels() {
    return this.ActivityModel.aggregate('labels', 'DISTINCT', {
      plain: false,
    }).then((rows: any) => {
      const array = [];
      rows.map((row) => {
        row.DISTINCT.map((lable) => {
          array.push(lable);
        });
      });
      return {
        labels: this.removeDuplicates(array),
      };
    });
  }

  private removeDuplicates(array: any[]): any[] {
    const a = [];
    array.map((x) => {
      if (!a.includes(x)) {
        a.push(x);
      }
    });
    return a;
  }

  private acitvityStatus = (): string[] => [
    'completed',
    'rejected',
    'partially_recorded',
    'recorded',
    'pre_approved',
    'pre_rejected',
    'approved',
  ];
}
