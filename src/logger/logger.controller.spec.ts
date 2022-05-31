import { Test, TestingModule } from '@nestjs/testing';
import { LoggerController } from './logger.controller';
import { LoggerModule } from './logger.module';
import { SequelizeModule } from '@nestjs/sequelize';

describe('Logger Controller', () => {
  let loggerController: LoggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        LoggerModule,
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
      controllers: [],
    }).compile();

    loggerController = module.get<LoggerController>(LoggerController);
  });

  it('should be defined', () => {
    expect(loggerController).toBeDefined();
  });
});
