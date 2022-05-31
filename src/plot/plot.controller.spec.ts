import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';
import { PlotController } from './plot.controller';
import { PlotModule } from './plot.module';
import { UsersModule } from '../users/users.module';

describe('PlotController', () => {
  let controller: PlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PlotModule,
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
      controllers: [PlotController],
      providers: [PermissionCheckService],
    }).compile();

    controller = module.get<PlotController>(PlotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
