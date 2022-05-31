import { UsersModule } from './../users/users.module';
import { PermissionCheckService } from './../auth/permisssions/checkPermissions';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from './activity.controller';
import { ActivityModule } from './activity.module';
import { PlotService } from '../plot/plot.service';
import { PlotModule } from '../plot/plot.module';

describe('ActivityController', () => {
  let controller: ActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ActivityModule,
        UsersModule,
        PlotModule,
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
      controllers: [ActivityController],
      providers: [PermissionCheckService, PlotService],
    }).compile();

    controller = module.get<ActivityController>(ActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
