import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { ActivitytemplateService } from '../activitytemplate/activitytemplate.service';
import { PlotService } from '../plot/plot.service';
import { ProjectsService } from '../projects/projects.service';
import { UsersService } from '../users/users.service';
import { PlannedActivityModule } from './planned-activity.module';
import { PlannedActivityService } from './planned-activity.service';
import { OrganizationService } from '../organizations/organizations.service';
import { Project } from '../projects/projects.model';
import { Plot } from '../plot/plot.model';
import { User } from '../users/users.model';
import { ActivityTemplate } from '../activitytemplate/activitytemplate.model';
import { Organization } from '../organizations/organizations.model';
import { Log } from '../logger/logs.model';
import { LoggerService } from '../logger/logger.service';
import { SmsService } from '../sms/sms.service';
import { JwtModule } from '@nestjs/jwt';
import { OtpService } from '../auth/otp/otp.service';
import { jwtConstants } from '../auth/constants';

describe('PlannedActivityService', () => {
  let service: PlannedActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PlannedActivityModule,
        UsersModule,
        SequelizeModule.forFeature([
          Project,
          Plot,
          User,
          ActivityTemplate,
          Organization,
          Log,
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
      providers: [
        PlannedActivityService,
        ProjectsService,
        PlotService,
        UsersService,
        ActivitytemplateService,
        OrganizationService,
        LoggerService,
        SmsService,
        OtpService,
      ],
    }).compile();

    service = module.get<PlannedActivityService>(PlannedActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
