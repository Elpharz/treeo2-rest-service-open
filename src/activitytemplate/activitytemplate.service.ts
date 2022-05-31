import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from 'src/projects/projects.model';
import { ActivityTemplate } from '../activitytemplate/activitytemplate.model';

@Injectable()
export class ActivitytemplateService {
  constructor(
    @InjectModel(ActivityTemplate)
    private ActivityTemplatemodel: typeof ActivityTemplate,
  ) {}
  async findAll(req: any) {
    try {
      const detailed = req.query.detailed;
      const params = this.groupBy(detailed);

      let result = await this.ActivityTemplatemodel.findAndCountAll({
        limit: 60,
        distinct: true,
        attributes: {
          exclude: [...params.excludeParams],
        },
        group: [params.groupById],
      });

      return result.rows;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  getAllActivityTemplatesAssignedToProject = async (projectID: number) => {
    const templateType = 'project_join_pending';
    return this.ActivityTemplatemodel.findAll({
      where: {
        projectID: projectID,
        activityTemplateType: templateType,
        isActive: true,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  };

  findOne = async (id: number) => {
    const activityTemplate = await ActivityTemplate.findOne({
      where: { id },
    });
    if (!activityTemplate) {
      throw new NotFoundException('ActivityTemplate not found');
    }
    return activityTemplate;
  };

  groupBy = (detailed: string) => {
    if (!detailed) {
      const excludeParams = [
        'createdAt',
        'updatedAt',
        'activityTemplateID',
        'userID',
        'code',
        'configuration',
        'pre_questionnaireID',
        'post_questionnaireID',
        'projectID',
        'id',
        'title',
        'description',
        'isActive',
        'autoGenerateOffset',
        'activityTemplateType',
        'frequency',
      ];

      return {
        excludeParams: excludeParams,
        groupById: 'activityType',
      };
    }

    if (detailed) {
      const excludeParams = [
        'createdAt',
        'updatedAt',
        'activityTemplateID',
        'userID',
        'code',
        'configuration',
        'pre_questionnaireID',
        'post_questionnaireID',
        'title',
        'description',
        'isActive',
        'autoGenerateOffset',
        'activityTemplateType',
        'frequency',
      ];
      return {
        excludeParams: excludeParams,
        groupById: 'id',
      };
    }
  };
}
