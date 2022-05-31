import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesModule } from '../roles/roles.module';
import { UserProjectsModule } from './user-projects.module';
import { UserProjectResolver } from './user-project.resolver';

describe('UserProjectResolver', () => {
  let resolver: UserProjectResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserProjectsModule,
        RolesModule,
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
      providers: [UserProjectResolver],
    }).compile();

    resolver = module.get<UserProjectResolver>(UserProjectResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
