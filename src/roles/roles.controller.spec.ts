import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { UsersController } from '../users/users.controller';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from './roles.module';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';

describe('RolesController', () => {
  let controller: RolesController;

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
      controllers: [RolesController, UsersController],
      providers: [PermissionCheckService],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
