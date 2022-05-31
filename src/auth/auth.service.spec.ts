import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
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
      providers: [],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should genrate access token', () => {
    let res = service.getJwtAccessToken({
      user: 'JOhn',
      email: 'john.kalyango@fairventures.org',
    });
    expect(typeof res).toEqual('string');
  });

  it('should genrate refresh token', () => {
    let res = service.getJwtRefreshToken({
      user: 'JOhn',
      email: 'john.kalyango@fairventures.org',
    });
    expect(typeof res).toEqual('string');
  });
});
