import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import { LoggerModule } from '../logger/logger.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { RolesModule } from './roles.module';
import { RolesService } from './roles.service';
import { OrganizationModule } from '../organizations/organizations.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { SmsModule } from '../sms/sms.module';
import { PlannedActivityModule } from '../planned-activity/planned-activity.module';

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        OrganizationModule,
        UsersModule,
        RolesModule,
        LoggerModule,
        SmsModule,
        PlannedActivityModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '3600s' },
        }),
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
      providers: [RolesService, UsersService, LoggerService],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
