import { Test, TestingModule } from '@nestjs/testing';
import { GoogleService } from './google.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth.module';

describe('Google auth service', () => {
  let googleService: GoogleService;

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
      controllers: [],
    }).compile();

    googleService = module.get<GoogleService>(GoogleService);
  });

  it('should be defined', () => {
    expect(googleService).toBeDefined();
  });

  let fakeRequest1 = {
    body: {
      authType: 'mobile',
    },
  };

  let fakeRequest2 = {
    body: {
      googleAuthToken: 'fakeToken___dfghjkl',
      authType: 'mobile',
    },
  };

  it('should return error when googleAuthToken attribute is missing', async () => {
    let result: any = await googleService.authenticateUser(fakeRequest1);
    expect(JSON.stringify(result)).toBe(
      JSON.stringify({
        status: 400,
        error: 'The verifyIdToken method requires an ID Token',
      }),
    );
  });

  it('should return error when googleAuthToken is wrong', async () => {
    let result: any = await googleService.googleAuth(fakeRequest2);
    expect(JSON.stringify(result)).toBe(
      JSON.stringify({
        status: 400,
        error: 'Wrong number of segments in token: fakeToken___dfghjkl',
      }),
    );
  });
});
