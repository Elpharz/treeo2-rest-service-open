import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { PlotModule } from '../plot/plot.module';
import { ActivityModule } from '../activity/activity.module';
import { MeasurementModule } from './measurement.module';
import { MeasurementService } from './measurement.service';
import { HttpModule } from '@nestjs/axios';

describe('MeasurementService', () => {
  let service: MeasurementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MeasurementModule,
        ActivityModule,
        PlotModule,
        HttpModule,
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
      providers: [MeasurementService],
    }).compile();

    service = module.get<MeasurementService>(MeasurementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
