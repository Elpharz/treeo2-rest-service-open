import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsModule } from '../permissions/permissions.module';
import { RolesModule } from '../roles/roles.module';
import { RolesPermissionsModule } from './roles-permissions.module';
import { RolesPermissionsService } from './roles-permissions.service';

describe('RolesPermissionsService', () => {
  let service: RolesPermissionsService;

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
      providers: [RolesPermissionsService],
    }).compile();

    service = module.get<RolesPermissionsService>(RolesPermissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
