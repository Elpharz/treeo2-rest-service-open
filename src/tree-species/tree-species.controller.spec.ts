import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { TreeSpeciesController } from './tree-species.controller';
import { TreeSpeciesModule } from './tree-species.module';
import { TreeSpeciesService } from './tree-species.service';

describe('TreeSpeciesController', () => {
  let controller: TreeSpeciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TreeSpeciesModule,
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
      controllers: [TreeSpeciesController],
      providers: [TreeSpeciesService],
    }).compile();

    controller = module.get<TreeSpeciesController>(TreeSpeciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
