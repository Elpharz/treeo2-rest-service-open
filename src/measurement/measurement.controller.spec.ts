import { HttpModule } from '@nestjs/axios';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { ActivityModule } from '../activity/activity.module';
import { MeasurementController } from './measurement.controller';
import { MeasurementModule } from './measurement.module';

describe('MeasurementController', () => {
  let controller: MeasurementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MeasurementModule,
        ActivityModule,
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
      controllers: [MeasurementController],
    }).compile();

    controller = module.get<MeasurementController>(MeasurementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
