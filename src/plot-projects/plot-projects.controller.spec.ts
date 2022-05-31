import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { PlotProjectsController } from './plot-projects.controller';
import { PlotProjectsModule } from './plot-projects.module';
import { PlotProjectsService } from './plot-projects.service';

describe('PlotProjectsController', () => {
  let controller: PlotProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PlotProjectsModule,
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
      controllers: [PlotProjectsController],
      providers: [PlotProjectsService],
    }).compile();

    controller = module.get<PlotProjectsController>(PlotProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
