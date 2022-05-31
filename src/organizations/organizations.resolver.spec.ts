import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { OrganizationModule } from './organizations.module';
import { OrganizationsResolver } from './organizations.resolver';

describe('OrganizationsResolver', () => {
  let resolver: OrganizationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        OrganizationModule,
        UsersModule,
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
      providers: [OrganizationsResolver],
    }).compile();

    resolver = module.get<OrganizationsResolver>(OrganizationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
