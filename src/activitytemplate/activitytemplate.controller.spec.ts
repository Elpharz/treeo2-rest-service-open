import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';
import { ActivitytemplateController } from './activitytemplate.controller';
import { ActivitytemplateModule } from './activitytemplate.module';

describe('ActivitytemplateController', () => {
  let controller: ActivitytemplateController;

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
      providers: [PermissionCheckService],
      controllers: [ActivitytemplateController],
    }).compile();

    controller = module.get<ActivitytemplateController>(
      ActivitytemplateController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
