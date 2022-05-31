import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsModule } from '../permissions/permissions.module';
import { RolesModule } from '../roles/roles.module';
import { RolesPermissionsController } from './roles-permissions.controller';
import { RolesPermissionsModule } from './roles-permissions.module';

describe('RolesPermissionsController', () => {
  let controller: RolesPermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RolesPermissionsModule,
        RolesModule,
        PermissionsModule,
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
      controllers: [RolesPermissionsController],
    }).compile();

    controller = module.get<RolesPermissionsController>(
      RolesPermissionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
