import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsModule } from './projects.module';
import { ProjectsResolver } from './projects.resolver';

describe('ProjectsResolver', () => {
  let resolver: ProjectsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ProjectsModule,
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
      providers: [ProjectsResolver],
    }).compile();

    resolver = module.get<ProjectsResolver>(ProjectsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
