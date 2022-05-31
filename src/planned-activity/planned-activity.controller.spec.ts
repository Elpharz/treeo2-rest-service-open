import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { PlannedActivityController } from './planned-activity.controller';
import { PlannedActivityModule } from './planned-activity.module';
import { UsersModule } from '../users/users.module';
import { UsersController } from '../users/users.controller';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';
import { forwardRef } from '@nestjs/common';
import { OrganizationModule } from '../organizations/organizations.module';

describe('PlannedActivityController', () => {
  let controller: PlannedActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => UsersModule),
        forwardRef(() => OrganizationModule),
        PlannedActivityModule,
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
      controllers: [PlannedActivityController, UsersController],
      providers: [PermissionCheckService],
    }).compile();

    controller = module.get<PlannedActivityController>(
      PlannedActivityController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
