import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { JwtRefreshTokenStrategy } from './jwt.refresh.token.strategy';

describe('AuthService', () => {
  let jwtRefreshTokenStrategy: JwtRefreshTokenStrategy;

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

    jwtRefreshTokenStrategy = module.get<JwtRefreshTokenStrategy>(
      JwtRefreshTokenStrategy,
    );
  });

  it('should be defined', () => {
    expect(jwtRefreshTokenStrategy).toBeDefined();
  });

  it('should be defined', async () => {
    let res = await jwtRefreshTokenStrategy.validate(
      { headers: { authorization: 'Bearer token' } },
      { email: 'john.kalyango@fairventures.org' },
    );
    expect(res).toEqual({
      email: 'john.kalyango@fairventures.org',
      token: 'token',
    });
  });
});
