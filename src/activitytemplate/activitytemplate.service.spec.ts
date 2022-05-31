import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { ActivitytemplateModule } from './activitytemplate.module';
import { ActivitytemplateService } from './activitytemplate.service';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';

describe('ActivitytemplateService', () => {
  let service: ActivitytemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ActivitytemplateModule,
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
      providers: [PermissionCheckService, ActivitytemplateService],
    }).compile();

    service = module.get<ActivitytemplateService>(ActivitytemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
