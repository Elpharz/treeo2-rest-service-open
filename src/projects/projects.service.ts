import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrganizationService } from '../organizations/organizations.service';
import { Organization } from '../organizations/organizations.model';
import { Project } from './projects.model';
import { CreateProjectDTO } from './dto/create-projectDTO';
import { Op } from 'sequelize';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectModel: typeof Project,
    private orgService: OrganizationService,
  ) {}

  async create(project: CreateProjectDTO): Promise<any> {
    await this.orgService.findOne(project.organizationID);
    const projectExists = await this.projectModel.findOne({
      where: { name: project.name, organizationID: project.organizationID },
    });
    if (projectExists) {
      throw new HttpException(
        'project name already exixts',
        HttpStatus.CONFLICT,
      );
    }
    return this.projectModel.create<Project>(project);
  }

  async findAll(): Promise<any> {
    return this.projectModel.findAndCountAll({
      distinct: true,
      limit: 30,
      attributes: { exclude: ['organizationID', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: Organization,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectModel.findOne({
      where: { id },
      attributes: { exclude: ['organizationID'] },
      include: [
        {
          model: Organization,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });
    if (!project) {
      throw new NotFoundException('project not found');
    }
    return project;
  }

  async ReAssignProjectToOrganization(
    projectID: number,
    organizationID: number,
  ): Promise<any> {
    await this.findOne(projectID);
    await this.orgService.findOne(organizationID);
    const [numberOfAffectedRows, [updatedProject]] =
      await this.projectModel.update(
        { organizationID },
        { where: { id: projectID }, returning: true },
      );
    return { rowsAffected: numberOfAffectedRows, updatedProject };
  }

  async getProjectByCountry(searchCountry: string) {
    // const countrySearch = searchCountry.charAt(0).toUpperCase() + searchCountry.slice(1)
    const countrySearch: string = searchCountry.toLowerCase();
    const projects: Project[] = await this.projectModel.findAll({
      include: [
        {
          model: Organization,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          required: true,
          // where: { country: { [Op.eq]: countrySearch } }
          where: { country: countrySearch },
        },
      ],
    });
    if (projects.length < 1) {
      return {
        data: projects,
        message: 'invalid country query',
      };
    }
    return {
      data: projects,
      message: 'country with projects',
    };
  }
}
