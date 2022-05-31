import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { TreeSpeciesModule } from './tree-species.module';
import { TreeSpeciesService } from './tree-species.service';

describe('TreeSpeciesService', () => {
  let service: TreeSpeciesService;

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
      providers: [TreeSpeciesService],
    }).compile();

    service = module.get<TreeSpeciesService>(TreeSpeciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
