import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { PlotModule } from './plot.module';
import { PlotService } from './plot.service';

describe('PlotService', () => {
  let service: PlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
      providers: [PlotService],
    }).compile();

    service = module.get<PlotService>(PlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
