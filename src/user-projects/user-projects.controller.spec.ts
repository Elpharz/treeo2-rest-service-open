import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from '../projects/projects.service';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';
import { UserProjectsController } from './user-projects.controller';
import { UserProjectsModule } from './user-projects.module';
import { UserProjectsService } from './user-projects.service';
import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { PlannedActivityService } from '../planned-activity/planned-activity.service';
import { Project } from '../projects/projects.model';
import { OrganizationService } from '../organizations/organizations.service';
import { LoggerService } from '../logger/logger.service';
import { SmsService } from '../sms/sms.service';
import { Role } from '../roles/roles.model';
import { PlannedActivity } from '../planned-activity/planned-activity.model';
import { PlotService } from '../plot/plot.service';
import { ActivitytemplateService } from '../activitytemplate/activitytemplate.service';
import { Organization } from '../organizations/organizations.model';
import { Log } from '../logger/logs.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { OtpService } from '../auth/otp/otp.service';
import { Plot } from '../plot/plot.model';
import { ActivityTemplate } from '../activitytemplate/activitytemplate.model';

describe('UserProjectsController', () => {
  let controller: UserProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserProjectsModule,
        SequelizeModule.forFeature([
          User,
          Project,
          Role,
          PlannedActivity,
          Organization,
          Log,
          Plot,
          ActivityTemplate,
        ]),
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
      controllers: [UserProjectsController],
      providers: [
        PermissionCheckService,
        UserProjectsService,
        ProjectsService,
        UsersService,
        RolesService,
        PlannedActivityService,
        OrganizationService,
        LoggerService,
        SmsService,
        PlotService,
        ActivitytemplateService,
        OtpService,
      ],
    }).compile();

    controller = module.get<UserProjectsController>(UserProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
