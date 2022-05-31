import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { SmsModule } from '../sms/sms.module';
import { jwtConstants } from '../auth/constants';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { OrganizationModule } from './organizations.module';
import { OrganizationService } from './organizations.service';
import { PlannedActivityModule } from '../planned-activity/planned-activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('OrganizationService', () => {
  let service: OrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        OrganizationModule,
        UsersModule,
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
        EventEmitterModule.forRoot({
          delimiter: '.',
          ignoreErrors: false,
        }),
      ],
      providers: [OrganizationService, UsersService, LoggerService],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
