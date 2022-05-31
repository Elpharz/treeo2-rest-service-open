import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { ModulesController } from './modules.controller';
import { ModulesModule } from './modules.module';

describe('ModulesController', () => {
  let controller: ModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ModulesModule,
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
      controllers: [ModulesController],
    }).compile();

    controller = module.get<ModulesController>(ModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
