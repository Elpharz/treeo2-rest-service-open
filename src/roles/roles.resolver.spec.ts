import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { RolesModule } from './roles.module';
import { RolesResolver } from './roles.resolver';

describe('RolesResolver', () => {
  let resolver: RolesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
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
      providers: [RolesResolver],
    }).compile();

    resolver = module.get<RolesResolver>(RolesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
