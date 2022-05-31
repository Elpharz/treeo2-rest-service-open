import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { Organization } from './organizations.model';
import { Role } from '../roles/roles.model';
import { Project } from '../projects/projects.model';
import { CreateOrganizationDTO } from './dto/create-organizationDTO';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization) private organizationModel: typeof Organization,
    @InjectModel(User) private userModel: typeof User,
    private usersService: UsersService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(organization: CreateOrganizationDTO): Promise<Organization> {
    const orgName = organization.name;
    const orgExists = await this.organizationModel.findOne({
      where: { name: orgName },
    });
    if (orgExists) {
      throw new HttpException(
        'organization name already exixts',
        HttpStatus.CONFLICT,
      );
    }
    organization.country = organization.country.toLowerCase();
    const org = await this.organizationModel.create<Organization>(organization);

    this.eventEmitter.emit('organization.create', { organizationID: org.id });
    return org;
  }

  async findAll(): Promise<Organization[]> {
    return this.organizationModel.findAll({
      limit: 30,
    });
  }

  async findOne(id: number): Promise<any> {
    const organization = await this.organizationModel.findOne({
      where: { id },
      include: [Role, Project],
    });
    if (!organization) {
      throw new NotFoundException('organization not found');
    }
    return organization;
  }

  async addOrganizationToUser(
    orgName: string,
    userEmail: string,
  ): Promise<any> {
    const organization = await this.organizationModel.findOne({
      where: { name: orgName },
    });
    if (!organization) {
      throw new NotFoundException('organization name not found');
    }
    await this.usersService.findByEmailLocal(userEmail);
    const [numberOfAffectedRows, [updatedUser]] = await this.userModel.update(
      { organizationID: organization.id },
      { where: { email: userEmail }, returning: true },
    );
    updatedUser.password = null;
    return {
      rowsAffected: numberOfAffectedRows,
      userEmail,
      orgName,
      updatedUser,
    };
  }
}
