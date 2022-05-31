import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { Role } from './roles.model';
import { Organization } from '../organizations/organizations.model';
import { CreateRoleDTO } from './dto/create-roleDTO';
import { OrganizationService } from '../organizations/organizations.service';
import { Permission } from '../permissions/permissions.model';
import { UserProject } from '../user-projects/user-project.model';
import { OnEvent } from '@nestjs/event-emitter';
import { logger } from '../logger/logger';

@Injectable()
export class RolesService {
  logger: Logger = new Logger(RolesService.name);
  constructor(
    @InjectModel(Role) private roleModel: typeof Role,
    @InjectModel(User) private userModel: typeof User,
    private usersService: UsersService,
    private orgService: OrganizationService,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleModel.findAll({
      limit: 30,
      include: [Organization, Permission, UserProject],
    });
  }

  async create(role: CreateRoleDTO): Promise<any> {
    await this.orgService.findOne(role.organizationID);
    const name = await this.roleModel.findOne({
      where: { name: role.name, organizationID: role.organizationID },
    });
    if (name) {
      throw new HttpException('role already exixts', HttpStatus.CONFLICT);
    }
    return this.roleModel.create<Role>(role);
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleModel.findOne({
      where: { id },
      include: [Organization, Permission, UserProject],
    });
    if (!role) {
      throw new NotFoundException('role not found');
    }
    return role;
  }

  async findOneByName(name: string): Promise<Role> {
    const role = await this.roleModel.findOne({
      where: { name },
    });
    if (!role) {
      throw new NotFoundException('role name not found');
    }
    return role;
  }

  async findRolesByOrganizationId(id: number): Promise<Role[]> {
    const role = await this.roleModel.findAll({
      where: { organizationID: id },
      include: [Permission],
    });
    if (!role) {
      throw new NotFoundException('role not found');
    }
    return role;
  }

  async findRoleByNameAndOrganization(
    name: string,
    organizationID: number,
  ): Promise<Role> {
    const role: Role = await this.roleModel.findOne({
      where: { name, organizationID },
    });
    if (!role) {
      throw new NotFoundException('role not found');
    }
    return role;
  }

  @OnEvent('organization.create', { async: true })
  async handleOrganizationCreated(payload: any) {
    const data: CreateRoleDTO = {
      name: 'Default Farmer',
      organizationID: payload.organizationID,
      operation: null,
      code: null,
    };
    const role: Role = await this.roleModel.create(data);
    logger.info(
      `role ${role.name} created for organizationID ${payload.organizationID}`,
    );
    console.log(
      `role ${role.name} created for organizationID ${payload.organizationID} roleID ${role.id}`,
    );
  }
}
