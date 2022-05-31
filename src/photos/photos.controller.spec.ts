import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementModule } from '../measurement/measurement.module';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';

describe('PhotosController', () => {
  let controller: PhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MeasurementModule,
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
      controllers: [PhotosController],
      providers: [PhotosService],
    }).compile();

    controller = module.get<PhotosController>(PhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
