import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from '../logger/logger.module';
import { UserProjectsModule } from './user-projects.module';
import { UserProjectsService } from './user-projects.service';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { ProjectsModule } from '../projects/projects.module';
import { PlannedActivityService } from '../planned-activity/planned-activity.service';
import { PlannedActivityModule } from '../planned-activity/planned-activity.module';
import { PlotService } from '../plot/plot.service';
import { ActivitytemplateService } from '../activitytemplate/activitytemplate.service';
import { Plot } from '../plot/plot.model';
import { ActivityTemplate } from '../activitytemplate/activitytemplate.model';

describe('UserProjectsService', () => {
  let service: UserProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserProjectsModule,
        LoggerModule,
        UsersModule,
        RolesModule,
        ProjectsModule,
        PlannedActivityModule,
        SequelizeModule.forFeature([Plot, ActivityTemplate]),
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
        UserProjectsService,
        PlannedActivityService,
        PlotService,
        ActivitytemplateService,
      ],
    }).compile();

    service = module.get<UserProjectsService>(UserProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
