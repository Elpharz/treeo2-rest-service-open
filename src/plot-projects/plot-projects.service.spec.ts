import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { PlotProjectsModule } from './plot-projects.module';
import { PlotProjectsService } from './plot-projects.service';

describe('PlotProjectsService', () => {
  let service: PlotProjectsService;

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
      providers: [PlotProjectsService],
    }).compile();

    service = module.get<PlotProjectsService>(PlotProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
