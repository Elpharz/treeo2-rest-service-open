import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { UsersController } from '../users/users.controller';
import { OrganizationController } from './organizations.controller';
import { OrganizationModule } from './organizations.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';

describe('OrganizationController', () => {
  let controller: OrganizationController;

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
      controllers: [OrganizationController, UsersController],
      providers: [PermissionCheckService],
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
