import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { OrganizationController } from '../organizations/organizations.controller';
import { OrganizationModule } from '../organizations/organizations.module';
import { ProjectsController } from './projects.controller';
import { ProjectsModule } from './projects.module';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO } from './dto/create-projectDTO';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let spyService: ProjectsService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ProjectsService,
      useFactory: () => ({
        create: jest.fn(() => {}),
        findOne: jest.fn(() => {}),
        findAll: jest.fn(() => []),
        ReAssignProjectToOrganization: jest.fn(() => {}),
        getProjectByCountry: jest.fn(() => {}),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ProjectsModule,
        OrganizationModule,
        UsersModule,
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
      controllers: [ProjectsController, OrganizationController],
      providers: [PermissionCheckService, ApiServiceProvider],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    spyService = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('calling createProject method', () => {
    const dto = new CreateProjectDTO();
    const createProjectSpy = jest.spyOn(spyService, 'create');
    expect(controller.createProject(dto)).not.toEqual(null);
    expect(createProjectSpy).toHaveBeenCalled();
    expect(createProjectSpy).toHaveBeenCalledWith(dto);
  });
  it('calling getAllProjects method', () => {
    const createProjectSpy = jest.spyOn(spyService, 'findAll');
    expect(controller.getAllProjects()).not.toEqual(null);
    expect(createProjectSpy).toHaveBeenCalled();
  });
  it('calling saveNotes method', () => {
    const id = '2134';
    const createProjectSpy = jest.spyOn(spyService, 'findOne');
    expect(controller.getSingleProject(id)).not.toEqual(null);
    expect(createProjectSpy).toHaveBeenCalled();
  });
});
