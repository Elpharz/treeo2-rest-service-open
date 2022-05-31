import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsModule } from './projects.module';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO } from './dto/create-projectDTO';
import { OrganizationService } from '../organizations/organizations.service';
import { Project } from './projects.model';
import { Organization } from '../organizations/organizations.model';
import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggerService } from '../logger/logger.service';
import { SmsService } from '../sms/sms.service';
import { Log } from '../logger/logs.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { OtpService } from '../auth/otp/otp.service';

class ProjectServiceMock {
  findAll() {
    return {};
  }

  findOne() {
    return { name: 'test project' };
  }

  create() {
    return {};
  }
}
class OrgServiceMock {
  findAll() {
    return {};
  }

  findOne() {
    return { name: 'test project' };
  }

  create() {
    return {};
  }
}

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ProjectsModule,
        SequelizeModule.forFeature([Project, User, Organization, Log]),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '3600s' },
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_TEST,
          synchronize: false,
        }),
      ],
      providers: [
        ProjectsService,
        OrganizationService,
        UsersService,
        EventEmitter2,
        LoggerService,
        SmsService,
        OtpService,
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('ProjectService', () => {
  let app: TestingModule;
  let service: ProjectsService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ProjectsService,
      useClass: ProjectServiceMock,
    };
    const OrgServiceProvider = {
      provide: ProjectsService,
      useClass: OrgServiceMock,
    };
    app = await Test.createTestingModule({
      providers: [ProjectsService, ApiServiceProvider, OrgServiceProvider],
    }).compile();
    service = app.get<ProjectsService>(ProjectsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a project with valid params', async () => {
    const createProjectSpy = jest.spyOn(service, 'create');
    const dto = new CreateProjectDTO();
    await service.create(dto);
    expect(createProjectSpy).toHaveBeenCalledWith(dto);
    expect(createProjectSpy).toHaveBeenCalledTimes(1);
  });
});
