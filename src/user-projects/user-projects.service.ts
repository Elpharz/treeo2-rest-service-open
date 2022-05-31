import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../roles/roles.model';
import { Project } from '../projects/projects.model';
import { User } from '../users/users.model';
import { UserProject } from './user-project.model';
import { UsersService } from '../users/users.service';
import { UpdateUserProjectDTO } from './dto/updateUserProjectDTO';
import { RolesService } from '../roles/roles.service';
import { ProjectsService } from '../projects/projects.service';
import { CreateUserProjectDTO } from './dto/create-userProjectDTO';
import { Organization } from '../organizations/organizations.model';
import { UserAssignProjectDTO } from './dto/user-assign-projectDTO';
import { ApproveUserProjectDTO } from './dto/approveUserProjectDTO';
import { PlannedActivityService } from '../planned-activity/planned-activity.service';

@Injectable()
export class UserProjectsService {
  logger: Logger = new Logger(UserProjectsService.name);
  constructor(
    @InjectModel(UserProject) private userProjectModel: typeof UserProject,
    private userService: UsersService,
    private roleService: RolesService,
    private projectService: ProjectsService,
    private PlannedService: PlannedActivityService,
  ) {}
  async findAll(): Promise<UserProject[]> {
    return this.userProjectModel.findAll({
      attributes: {
        exclude: ['projectID', 'userID', 'roleID', 'preferedLogin', 'isActive'],
      },
      include: [
        { model: User, attributes: { exclude: ['password', 'refreshToken'] } },
        Project,
        Role,
      ],
    });
  }

  async findOne(userProjectId: number): Promise<UserProject> {
    const userProject = await this.userProjectModel.findOne({
      where: { id: userProjectId },
      attributes: { exclude: ['createdAt', 'projectID', 'userID', 'roleID'] },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'password',
              'phoneNumber',
              'isActive',
              'preferedLogin',
              'refreshToken',
              'isGdprCompliant',
              'preferences',
              'userID',
            ],
          },
        },
        {
          model: Project,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: Role,
          attributes: {
            exclude: [
              'operation',
              'code',
              'organizationID',
              'createdAt',
              'updatedAt',
            ],
          },
          include: [
            {
              model: Organization,
              attributes: {
                exclude: [
                  'code',
                  'status',
                  'active_from',
                  'active_to',
                  'createdAt',
                ],
              },
            },
          ],
        },
      ],
    });
    if (!userProject) {
      throw new NotFoundException('user-project not found');
    }
    return userProject;
  }

  async updateUserProjects(
    userProjectID: number,
    updateData: UpdateUserProjectDTO,
  ) {
    await this.userService.findOne(updateData.userID);
    await this.roleService.findOne(updateData.roleID);
    await this.projectService.findOne(updateData.projectID);
    await this.findOne(userProjectID);

    try {
      const result = await this.userProjectModel.update(
        { ...updateData },
        { where: { id: userProjectID }, returning: true },
      );
      return {
        data: result[1],
        message: 'user project updated',
      };
    } catch (e) {
      this.logger.error(`${e}`);
      throw new HttpException(
        'not able to update',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async userAssignProject(
    assignData: UserAssignProjectDTO,
    perfomedBy: number,
  ) {
    await this.userService.findOne(perfomedBy);
    await this.projectService.findOne(assignData.projectID);

    const foundUserProject = await this.findAllByUserAndProject(
      perfomedBy,
      assignData.projectID,
    );

    if (foundUserProject != null) {
      throw new HttpException(
        'user on project already exists',
        HttpStatus.CONFLICT,
      );
    }

    assignData.roleID = null;
    assignData.userID = perfomedBy;
    const projectById: Project = await this.projectService.findOne(
      assignData.projectID,
    );
    const organizationId: number = projectById.organization.id;

    const defaultRole: Role =
      await this.roleService.findRoleByNameAndOrganization(
        'Default Farmer',
        organizationId,
      );
    const defaultRoleId: number = defaultRole.id;
    assignData.roleID = defaultRoleId;
    const createNewUserProject = { ...assignData, performedById: perfomedBy };

    const plannedData = {
      projectID: assignData.projectID,
      userID: assignData.userID,
    };

    try {
      const result: UserProject = await this.userProjectModel.create(
        createNewUserProject,
      );

      this.PlannedService.assignUserPlannedActivityUsingProjectID(plannedData);

      return {
        data: result,
        message: 'User on Project Created',
      };
    } catch (e) {
      this.logger.error(`${e}`);
      throw new HttpException(
        'not able to add user-project',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async create(userProjectInfo: CreateUserProjectDTO) {
    await this.userService.findOne(userProjectInfo.userID);
    await this.roleService.findOne(userProjectInfo.roleID);
    await this.projectService.findOne(userProjectInfo.projectID);

    this.verifyIsDuplicate(userProjectInfo);

    try {
      const result = await this.userProjectModel.create(userProjectInfo);
      return {
        data: result,
        message: 'User Project Created',
      };
    } catch (e) {
      this.logger.error(`${e}`);
      throw new HttpException(
        'not able to add user-project',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await user.destroy();
    return {
      data: user,
      message: 'user project deleted',
    };
  }

  async verifyIsDuplicate(
    userProjectInfo: CreateUserProjectDTO | UserAssignProjectDTO,
  ) {
    let args = {
      userID: userProjectInfo.userID,
      projectID: userProjectInfo.projectID,
      roleID: userProjectInfo?.roleID,
    };

    const isDuplicate = await this.userProjectModel.findOne({
      where: { ...args },
    });

    if (isDuplicate) {
      throw new HttpException(
        'user project already exists',
        HttpStatus.CONFLICT,
      );
    }
  }

  async findAllByUserAndProject(userID: number, projectID: number) {
    const userProject: UserProject[] = await this.userProjectModel.findAll({
      where: { userID, projectID },
    });
    if (userProject.length === 0) {
      return null;
    }
    return userProject;
  }

  async getUserOnProjectById(userProjectId: number) {
    const userProject: UserProject = await this.userProjectModel.findOne({
      where: { id: userProjectId },
      include: [
        { model: Role, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      ],
    });
    if (!userProject) {
      throw new NotFoundException('user project not found');
    }
    return {
      data: userProject,
      message: 'user projects found',
    };
  }

  async approveUserToProject(
    approvalData: ApproveUserProjectDTO,
    userProjectID: number,
    approvedBy: number,
  ) {
    const userProject = this.findOne(userProjectID);
    if (!userProject) {
      throw new NotFoundException('user project not found');
    }

    const { status } = approvalData;

    try {
      const result = await this.userProjectModel.update(
        { status, performedById: approvedBy },
        { where: { id: userProjectID }, returning: true },
      );
      return {
        data: result[1],
        message: 'user on project updated',
      };
    } catch (e) {
      this.logger.error(`${e}`);
      throw new HttpException(
        'not able to update',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
