import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Plot } from '../plot/plot.model';
import { ActivityTemplate } from '../activitytemplate/activitytemplate.model';
import { PlannedActivity } from './planned-activity.model';
import { Questionnaire } from '../questionnaire/questionnaire.model';
import { User } from '../users/users.model';
import { CreatePlannedActivityDTO } from './dto/create-planned-ActivityDTO';
import {
  getOffset,
  sortOrder,
  sortParam,
  getSize,
  getPage,
  getPreviousPage,
  getNextPage,
} from '../core/paginationAndSorting';
import { UpdatePlannedActivityDTO } from './dto/update-planned-activityDTO';
import { ProjectsService } from '../projects/projects.service';
import { PlotService } from '../plot/plot.service';
import { UsersService } from '../users/users.service';
import { ActivitytemplateService } from '../activitytemplate/activitytemplate.service';
import { Activity } from '../activity/activity.model';
import { Op } from 'sequelize';

@Injectable()
export class PlannedActivityService {
  constructor(
    @InjectModel(PlannedActivity)
    private plannedActivityModel: typeof PlannedActivity,
    private projectService: ProjectsService,
    private plotService: PlotService,
    private userService: UsersService,
    private activityTemplateService: ActivitytemplateService,
  ) {}

  async findOne(id: number): Promise<PlannedActivity> {
    const plannedActivity = await this.plannedActivityModel.findOne({
      where: {
        id,
        status: { [Op.ne]: 'deleted' },
      },
      attributes: { exclude: ['activityTemplateID', 'plotID'] },
      include: [
        {
          model: ActivityTemplate,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: Questionnaire,
              attributes: { exclude: ['createdAt', 'updatedAt', 'answers'] },
            },
          ],
        },
        {
          model: Plot,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });
    if (!plannedActivity) {
      throw new NotFoundException('PlannedActivity not found');
    }
    return plannedActivity;
  }

  async create(plannedActivity: CreatePlannedActivityDTO) {
    const { userID, plotID, activityTemplateID, activityID } = plannedActivity;
    await this.userService.findOne(userID);
    await this.activityTemplateService.findOne(activityTemplateID);

    if (plotID) {
      await this.plotService.findOne(plotID);
    }

    if (activityID) {
      await this.checkIfActivityExist(activityID);
    }

    if (plannedActivity.configuration) {
      plannedActivity.configuration = JSON.parse(plannedActivity.configuration);
    }

    if (plannedActivity.title) {
      plannedActivity.title = JSON.parse(plannedActivity.title);
    }

    if (plannedActivity.description) {
      plannedActivity.description = JSON.parse(plannedActivity.description);
    }

    try {
      const result = await this.plannedActivityModel.create(plannedActivity);
      return {
        data: result,
        message: 'planned activity created',
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'can not create planned activity',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async findAll() {
    return this.plannedActivityModel.findAndCountAll({
      where: { status: { [Op.ne]: 'deleted' } },
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
      ],
      attributes: { exclude: [] },
    });
  }

  async getUserplannedActivities(id: number, req: any) {
    const page = getPage(req);
    const size = getSize(req);
    const data = await this.plannedActivityModel.findAndCountAll({
      limit: size,
      offset: getOffset(page, size),
      order: [[sortParam(req.query), sortOrder(req.query)]],
      where: { userID: id, status: { [Op.ne]: 'deleted' } },
      attributes: { exclude: ['activityTemplateID', 'plotID'] },
      include: [
        {
          model: ActivityTemplate,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: Questionnaire,
              attributes: { exclude: ['createdAt', 'updatedAt', 'answers'] },
            },
          ],
        },
        {
          model: Plot,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
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

  async update(
    plannedActivityID: number,
    updateData: UpdatePlannedActivityDTO,
  ) {
    await this.findOne(plannedActivityID);

    if (updateData.userID) {
      await this.userService.findOne(updateData.userID);
    }

    if (updateData.activityTemplateID) {
      await this.activityTemplateService.findOne(updateData.activityTemplateID);
    }

    if (updateData.configuration) {
      updateData.configuration = JSON.parse(updateData.configuration);
    }

    if (updateData.title) {
      updateData.title = JSON.parse(updateData.title);
    }

    if (updateData.description) {
      updateData.description = JSON.parse(updateData.description);
    }

    try {
      const result = await this.plannedActivityModel.update(
        { ...updateData },
        {
          where: { id: plannedActivityID },
          returning: true,
        },
      );
      return {
        data: result[1],
        message: 'planned activity updated',
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'not able to update',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async checkPlannedActivityByUser(userID: any) {
    const plannedActivity = await this.plannedActivityModel.findOne({
      where: { userID, status: { [Op.ne]: 'deleted' } },
      attributes: { exclude: ['activityTemplateID', 'plotID'] },
    });
    if (!plannedActivity) {
      throw new NotFoundException('PlannedActivity not found');
    }
    return plannedActivity;
  }

  async checkActivityTemplateExist(id: any) {
    const activityTemplate = await ActivityTemplate.findOne({
      where: { id },
    });
    if (!activityTemplate) {
      throw new NotFoundException('ActivityTemplate not found');
    }
    return activityTemplate;
  }

  // TODO: replace with userService
  async checkValidUser(id: number) {
    const user = await User.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  assignUserPlannedActivityUsingProjectID = async (plannedData: any) => {
    const { userID, projectID } = plannedData;

    // date
    let event = new Date(); // current date and time

    // get activityTemplateID
    const activityTemplate =
      await this.activityTemplateService.getAllActivityTemplatesAssignedToProject(
        projectID,
      );

    const userPlannedActivity: CreatePlannedActivityDTO =
      new CreatePlannedActivityDTO();

    // add more items to planned data

    if (plannedData && plannedData.plotID != null) {
      await this.userService.findOne(userID);
      await this.projectService.findOne(projectID);
      await this.plotService.findOne(plannedData.plotID);

      userPlannedActivity.plotID = plannedData.plotID;
    }
    if (plannedData && plannedData.userID != null) {
      userPlannedActivity.userID = userID;
    }
    userPlannedActivity.completedByActivity = false;
    userPlannedActivity.status = 'planned';

    activityTemplate.forEach(async (element) => {
      userPlannedActivity.activityTemplateID = element.id;
      userPlannedActivity.title = element.title;
      userPlannedActivity.description = element.description;
      userPlannedActivity.configuration = element.configuration;
      if (element.frequency == 'adhoc') {
        userPlannedActivity.type = 'adhoc';
      } else {
        userPlannedActivity.type = 'onetime';
        event = new Date(); // current date and time
        event = new Date(event.toDateString());
        event.setHours(element.autoGenerateOffset);

        userPlannedActivity.dueDate = new Date(event).toISOString();
      }

      await this.plannedActivityModel.create(userPlannedActivity);
    });

    return {
      message: 'planned activity created',
    };
  };

  async getPlannedActivitiesAssignedToUser(id: number) {
    const data = await this.plannedActivityModel.findAndCountAll({
      where: { userID: id, status: 'planned' },
      attributes: { exclude: ['activityTemplateID', 'plotID'] },
      include: [
        {
          model: ActivityTemplate,
          attributes: {
            exclude: [
              'activityTemplateID',
              'code',
              'title',
              'description',
              'configuration',
              'autoGenerateOffset',
              'activityTemplateType',
              'isActive',
              'createdAt',
              'updatedAt',
            ],
          },
          include: [
            {
              model: Questionnaire,
              attributes: { exclude: ['createdAt', 'updatedAt', 'answers'] },
            },
          ],
        },
        {
          model: Plot,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });

    for (const i in data.rows) {
      if (data.rows[i].title == null) {
        const activityTem = await this.activityTemplateService.findOne(
          data.rows[i].activityTemplate.id,
        );
        data.rows[i].title = activityTem.title;
      }

      if (data.rows[i].description == null) {
        const activityTem = await this.activityTemplateService.findOne(
          data.rows[i].activityTemplate.id,
        );
        data.rows[i].description = activityTem.description;
      }

      if (data.rows[i].configuration == null) {
        const activityTem = await this.activityTemplateService.findOne(
          data.rows[i].activityTemplate.id,
        );
        data.rows[i].configuration = activityTem.configuration;
      }
    }

    return {
      plannedActivites: data.rows,
    };
  }

  checkIfActivityExist = async (id: string) => {
    const activity = await Activity.findOne({
      where: { id },
    });
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }
  };
}
