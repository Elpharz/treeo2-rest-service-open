import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { redis } from '../src/mailer/redis';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
import { appData, fakeUser, user, user2 } from './mocks/userMock';
import { activity, activity2, activity3 } from './mocks/activityMock';
import {
  measurement,
  measurement2,
  measurement3,
  measurementMock,
} from './mocks/measurementMock';
import { fakeDeviceInfo } from './mocks/deviceInfoMock';
import { plot, plot2, plot3 } from './mocks/plotMock';
import { point } from './mocks/pointMock';
import { fakeOrganization, fakeOrganization2 } from './mocks/organizationMock';
import { fakeProject } from './mocks/projectMock';
import { fakeRole } from './mocks/roleMock';
import { treeSpecies } from './mocks/treeSpeciesMock';
import { plannedActivity, fakePlanned } from './mocks/plannedMock';

dotenv.config();

jest.setTimeout(50000);
describe('Test Runner (e2e)', () => {
  let app: INestApplication;
  let mobileUserToken: any;
  let mobileUserId: number;
  let webUserToken: any;

  const { webSignUp, mobileSignUp } = appData;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
      }),
    );
    await app.listen(9001);
  });

  const createUser = async () => {
    return request(app.getHttpServer()).post('/users').send(webSignUp);
  };

  const loginUser = async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: webSignUp.email, password: webSignUp.password })
      .expect('Content-Type', /json/);
  };

  describe('/users e2e tests', () => {
    it('/users POST create a User', async () => {
      const response = await createUser();
      expect(response.status).toBe(201);
      expect(response.body.firstName).toBe(webSignUp.firstName);
      expect(response.body.lastName).toBe(webSignUp.lastName);
      expect(response.body.isActive).toBe(webSignUp.isActive);
    });

    it('POST should create a mobile User', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/mobile/register')
        .send(mobileSignUp);
      expect(response.status).toBe(201);
      expect(response.body.firstName).toBe(mobileSignUp.firstName);
      expect(response.body.lastName).toBe(mobileSignUp.lastName);
      expect(response.body.isActive).toBeFalsy();
      expect(response.body.email).toBeFalsy();
    });

    it('POST should validate a created mobile User', async () => {
      const otp = await redis.get(mobileSignUp.phoneNumber.replace('+', ''));
      const req = {
        phoneNumber: mobileSignUp.phoneNumber,
        code: otp,
      };
      const response = await request(app.getHttpServer())
        .post('/auth/validate-mobile-user')
        .send(req);
      mobileUserToken = response.body.data.token;
      mobileUserId = response.body.data.userId;
      expect(response.status).toBe(201);
      expect(response.body.data.token).toBeTruthy();
      expect(response.body.message).toEqual(
        `${mobileSignUp.phoneNumber} has been activated`,
      );
    });

    it('/users POST can not create duplicate user emails', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(webSignUp);
      expect(response.status).toBe(409);
      expect(response.body.message).toEqual('email already exixts');
    });

    it('/users (GET) get single user by id', async () => {
      const loginResponse = await loginUser();
      const userToken = loginResponse.body.data.token;
      const response = await request(app.getHttpServer())
        .get('/users/userId/1')
        .set('Authorization', 'bearer ' + userToken);
      expect(response.status).toBe(200);
    });

    it('/users (GET) FAIL', async () => {
      const loginResponse = await loginUser();
      const userToken = loginResponse.body.data.token;
      const response = await request(app.getHttpServer())
        .get('/users/userId/99')
        .set('Authorization', 'bearer ' + userToken);
      expect(response.status).toBe(404);
    });

    it('/users (POST) user by email fail', async () => {
      const failEmail = faker.internet.email();
      const response = await request(app.getHttpServer())
        .post('/users/search')
        .send({ email: failEmail });
      expect(response.status).toBe(404);
    });

    it('/users (POST) search user by email', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/search')
        .send({ email: webSignUp.email });
      expect(response.status).toBe(200);
    });

    it.skip('/users/confirm/:id should validate a user email to isActive:true', async () => {
      const keys = await redis.keys('*');
      expect(keys).toBeInstanceOf(Array);
      expect(await redis.get(keys[1])).toBe(webSignUp.email);
      const uuid = keys[1];
      const path = `/users/confirm/${uuid}`;
      const response = await request(app.getHttpServer()).get(path);
      expect(response.status).toBe(200);
    });

    it('/users (GET) normal user fails to get all users', async () => {
      const loginResponse = await loginUser();
      const userToken = loginResponse.body.data.token;
      const access = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', 'bearer ' + userToken);
      expect(access.status).toBe(401);
    });
    it('/users (GET) admin get all users', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);
      webUserToken = result.body.data.token;
      const access = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(access.status).toBe(200);
    });

    it('should view user details', async () => {
      const response = await loginUser();
      const token = response.body.data.token;
      const access = await request(app.getHttpServer())
        .get(`/users/${response.body.data.userId}`)
        .set('Authorization', 'bearer ' + token);
      expect(access.status).toBe(200);
    });

    it('should be updated fails Permission Denied', async () => {
      const response = await loginUser();
      const token = response.body.data.token;
      const access = await request(app.getHttpServer())
        .patch(`/users/${response.body.data.userId}`)
        .set('Authorization', 'bearer ' + token)
        .send(fakeUser);
      expect(access.status).toBe(401);
    });

    it('update user fails when user doesnot exist', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);
      await request(app.getHttpServer())
        .patch('/users/45')
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(fakeUser)
        .expect(404);
    });
  });

  describe('/auth e2e tests', () => {
    it('/auth/login should return a valid jwt', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);
      expect(result.status).toBe(200);
    });

    it('/auth/login should fail with invalid password', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: webSignUp.email, password: process.env.DB_PASS })
        .expect(401);
    });

    it('/auth/login should login with valid jwt', async () => {
      const response = await loginUser();
      const token = response.body.data.token;
      await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', 'bearer ' + token)
        .expect(200);
    });

    it('/auth/profile should reject invalid jwt', async () => {
      const token = faker.datatype.uuid();
      await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', 'bearer ' + token)
        .expect(401);
    });
  });

  describe('/organization', () => {
    it('POST should create an organization', () => {
      return request(app.getHttpServer())
        .post('/organization')
        .send({
          name: fakeOrganization.name,
          country: fakeOrganization.country,
        })
        .expect(201);
    });

    it('POST should not create an organization with duplicate name', () => {
      return request(app.getHttpServer())
        .post('/organization')
        .send({
          name: fakeOrganization.name,
          country: fakeOrganization.country,
        })
        .expect(409);
    });

    it('GET unauthenticated users should NOT get all organizations', async () => {
      const response = await request(app.getHttpServer()).get('/organization');
      expect(response.status).toBe(401);
    });

    it('GET should organization by id', async () => {
      const response = await request(app.getHttpServer()).get(
        '/organization/1',
      );
      expect(response.status).toBe(200);
    });

    it('GET should not find null organization by id', async () => {
      const response = await request(app.getHttpServer()).get(
        '/organization/99',
      );
      expect(response.status).toBe(404);
    });

    it('POST cannot add null user to organization', () => {
      return request(app.getHttpServer())
        .post('/organization/user/update')
        .send({ orgName: fakeOrganization.name, email: faker.internet.email() })
        .expect(404);
    });
  });

  describe('/projects', () => {
    it('POST should create a project in an organization', () => {
      return request(app.getHttpServer())
        .post('/projects')
        .send({
          name: fakeProject.name,
          projectStatus: fakeProject.projectStatus,
          organizationID: fakeProject.organizationID,
        })
        .expect(201);
    });

    it('GET should get all projects', async () => {
      const response = await request(app.getHttpServer()).get('/projects');
      expect(response.status).toBe(200);
    });

    it('GET should project by id', async () => {
      const response = await request(app.getHttpServer()).get('/projects/1');
      expect(response.status).toBe(200);
    });

    it('GET should not find null project by id', async () => {
      const response = await request(app.getHttpServer()).get('/projects/99');
      expect(response.status).toBe(404);
    });

    it('POST should reassign project to different organization', async () => {
      await request(app.getHttpServer())
        .post('/organization')
        .send({
          name: fakeOrganization2.name,
          country: fakeOrganization2.country,
        })
        .expect(201);
      return request(app.getHttpServer())
        .post('/projects/reassign')
        .send({
          projectId: 1,
          orgId: 2,
        })
        .expect(201);
    });
  });

  describe('/role', () => {
    it('POST should create a role in an organization', () => {
      return request(app.getHttpServer())
        .post('/roles')
        .send({
          name: fakeRole.name,
          organizationID: fakeRole.organizationID,
        })
        .expect(201);
    });

    it('POST should not create a duplicate role in an organization', () => {
      return request(app.getHttpServer())
        .post('/roles')
        .send({
          name: fakeRole.name,
          organizationID: fakeRole.organizationID,
        })
        .expect(409);
    });

    it('POST should not create a role in a null organization', () => {
      return request(app.getHttpServer())
        .post('/roles')
        .send({
          name: fakeRole.name,
          organizationID: 99,
        })
        .expect(404);
    });

    it('GET should get all roles', async () => {
      const response = await request(app.getHttpServer()).get('/roles');
      expect(response.status).toBe(200);
    });

    it('GET should role by id', async () => {
      const response = await request(app.getHttpServer()).get('/roles/1');
      expect(response.status).toBe(200);
    });

    it('GET should not find null role by id', async () => {
      const response = await request(app.getHttpServer()).get('/roles/99');
      expect(response.status).toBe(404);
    });
  });

  describe('/device-info', () => {
    it('GET should get all device information', async () => {
      const response = await request(app.getHttpServer()).get('/device-info');
      expect(response.status).toBe(200);
    });

    it('POST should not create device info without auth', async () => {
      const response = await request(app.getHttpServer())
        .post('/device-info')
        .send(fakeDeviceInfo);
      expect(response.status).toBe(401);
    });

    it('POST should create and get device info by id', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .post('/device-info')
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(fakeDeviceInfo);
      expect(response.status).toBe(201);
      expect(response.body.data).toBeTruthy();

      const responses = await request(app.getHttpServer())
        .get(`/device-info/${response.body.data.deviceInfo.id}`)
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(responses.status).toBe(200);
    });

    it('GET all device info', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get('/device-info')
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(200);
    });

    it('GET FAIL to device info for invalid id', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get('/device-info/83162748-fda9-4818-ba4b-f1a6dcb37929')
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(404);
    });

    it('GET device info for user', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get('/device-info/user')
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(200);
    });

    it('GET device info for user FAILS', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user2);

      const response = await request(app.getHttpServer())
        .get('/device-info/user')
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(200);
      expect(response.body.data).toBe('');
    });
  });

  describe('/activitiy e2e tests', () => {
    let token;
    it('GET should fail to get all activities without auth', async () => {
      const response = await request(app.getHttpServer()).get('/activities');
      expect(response.status).toBe(401);
    });

    it('POST should create an activity', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);
      token = result.body.data.token;

      const response = await request(app.getHttpServer())
        .post('/activities')
        .set('Authorization', 'bearer ' + token)
        .send(activity);
      expect(response.status).toBe(201);
      expect(response.body.data.activity.status).toBe('partially_recorded');
    });

    it('POST user2 should create an activity', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user2);
      token = result.body.data.token;

      const response = await request(app.getHttpServer())
        .post('/activities')
        .set('Authorization', 'bearer ' + token)
        .send(activity3);
      expect(response.status).toBe(201);
    });

    it('POST should FAIL to create a duplicate activity', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);
      token = result.body.data.token;

      const response = await request(app.getHttpServer())
        .post('/activities')
        .set('Authorization', 'bearer ' + token)
        .send(activity);
      expect(response.status).toBe(422);
    });

    it('POST should FAIL to create an activity with null outsidePolygon', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);
      token = result.body.data.token;

      const response = await request(app.getHttpServer())
        .post('/activities')
        .set('Authorization', 'bearer ' + token)
        .send(activity2);
      expect(response.status).toBe(400);
    });

    it('GET should get an activity', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);
      token = result.body.data.token;

      const response = await request(app.getHttpServer())
        .get(`/activities/${activity.activity.id}`)
        .set('Authorization', 'bearer ' + token);
      expect(response.status).toBe(200);
    });

    it('GET should get ALL activity', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);
      token = result.body.data.token;

      const response = await request(app.getHttpServer())
        .get('/activities')
        .set('Authorization', 'bearer ' + token);
      expect(response.status).toBe(200);
    });

    it('PATCH should update an activity', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);
      token = result.body.data.token;

      const updateActivity = {
        outsidePolygon: null,
      };
      const response = await request(app.getHttpServer())
        .patch(`/activities/${activity.activity.id}`)
        .set('Authorization', 'bearer ' + token)
        .send(updateActivity);
      expect(response.status).toBe(200);
    });
  });

  describe('/measurements', () => {
    it('GET should fail to get all measurements without auth', async () => {
      const response = await request(app.getHttpServer()).get('/measurements');
      expect(response.status).toBe(401);
    });

    it('POST should get create a measurement', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .post('/measurements')
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(measurement);
      expect(response.status).toBe(201);
    });

    it('POST measurement should be ignored if measurement_type tree_measurement_auto_not_detected', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const Measurement = measurementMock();
      Measurement.measurement_type = 'tree_measurement_auto_not_detected';

      const response2 = await request(app.getHttpServer())
        .post('/measurements')
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(Measurement);
      expect(response2.status).toBe(201);
      expect(response2.body.status).toEqual('ignored');
    });

    it('GET should get a single measurement by id', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get(`/measurements/${measurement.id}`)
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(200);
    });

    it('POST should get change status of activity to complete', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .post('/measurements')
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(measurement2);
      expect(response.status).toBe(201);

      const response2 = await request(app.getHttpServer())
        .post('/measurements')
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(measurement3);
      expect(response2.status).toBe(201);
      await new Promise((r) => setTimeout(r, 15000));

      const response4 = await request(app.getHttpServer())
        .get(`/measurements/activity/${activity.activity.id}`)
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response4.body.count).toBe(4);

      // TODO: uncomment for local e2e
      // await new Promise((r) => setTimeout(r, 20000));
      // const response3 = await request(app.getHttpServer())
      //   .get(`/activities/${activity.activity.id}`)
      //   .set('Authorization', 'bearer ' + result.body.data.token);
      // expect(response3.status).toBe(200);
      // expect(response3.body.status).toBe('recorded');
    });

    it('POST should NOT create a duplicate measurement', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .post('/measurements')
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(measurement);
      expect(response.status).toBe(422);
    });

    it('GET should FAIL to get an invalid measurement by id', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get('/measurements/1cab2604-cc5e-4373-bfdf-fd8a172e7d86')
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(404);
    });

    it('GET should get ALL measurements', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get('/measurements')
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(200);
    });

    it('GET should get measurements for a particular Activity', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get(`/measurements/activity/${activity.activity.id}`)
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(200);
    });
    it('GET should FAIL to get measurements for an invalid Activity', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get(`/measurements/activity/c5b6e876-99c5-4e99-9cda-4ec8ef3bf533`)
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(404);
    });

    it('PATCH should update an measurement', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const updateMeasurement = {
        status: 'pre_approved',
      };
      const response = await request(app.getHttpServer())
        .patch(`/measurements/${measurement.id}`)
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(updateMeasurement);
      expect(response.status).toBe(200);
    });

    it('PATCH should FAIL to update an activity with invalid id', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const updateMeasurement = {
        status: 'pre_approved',
      };
      const response = await request(app.getHttpServer())
        .patch(`/measurements/3b1478c0-0f04-4042-9061-cfa6f0d38ae5`)
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(updateMeasurement);
      expect(response.status).toBe(404);
    });

    it('PATCH should FAIL to update a measurement with invalid status', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const updateMeasurement = {
        status: 'xxx___xxx',
      };
      const response = await request(app.getHttpServer())
        .patch(`/measurements/${measurement.id}`)
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(updateMeasurement);
      expect(response.status).toBe(400);
    });

    it('GET should get activitiy measurements aggregagte data summary', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get(`/measurements/activity/${activity.activity.id}/summary`)
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(200);
    });

    it('GET should not  get activitiy measurements aggregagte data summary', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get(
          `/measurements/activity/66401487-5142-4113-93ae-fbfba12d239d/summary`,
        )
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(404);
    });

    it('GET should not get activitiy measurements aggregagte data summary without authentication', async () => {
      const response = await request(app.getHttpServer()).get(
        `/measurements/activity/${activity.activity.id}/summary`,
      );
      expect(response.status).toBe(401);
    });

    it('PATCH it should bulk approve measurements', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const batchApproval = {
        measurements: [
          {
            measurementID: `${measurement.id}`,
            status: 'approved',
          },
          {
            measurementID: `${measurement2.id}`,
            status: 'approved',
          },
        ],
      };
      const response = await request(app.getHttpServer())
        .patch(`/measurements/v2/batch-status-update`)
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(batchApproval);
      expect(response.status).toBe(200);
      const response2 = await request(app.getHttpServer())
        .get(`/measurements/${measurement.id}`)
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response2.status).toBe(200);
      expect(response2.body.status).toEqual('approved');
      const response3 = await request(app.getHttpServer())
        .get(`/measurements/${measurement2.id}`)
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response3.status).toBe(200);
      expect(response3.body.status).toEqual('approved');
    });
  });

  describe('/plots', () => {
    let testPlots = {};
    let plotName = {};
    it('POST should create a plot', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .post('/plots/create/polygon')
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(plot);
      expect(response.status).toBe(201);
    });

    it('POST should create a plot without externalId', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .post('/plots/create/polygon')
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(plot2);
      expect(response.status).toBe(201);
      testPlots = { ...response, id: response.body.data.id };
    });

    it('POST should create a point', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .post('/plots/create/point')
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(point);
      expect(response.status).toBe(201);
    });

    it('GET plot for user', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get('/plots/user/plots')
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(200);
    });

    it.skip('GET should get plot by id', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get(`/plots/${testPlots['id']}`)
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(200);
    });

    it('GET should NOT get plot by invalid id', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get(`/plots/100`)
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(404);
    });

    it('GET plot by externalID', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get('/plots/externalId/45679')
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(200);
    });

    it('GET all plots', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get('/plots/user/all/plots')
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(200);
    });

    it('POST should create a plot including plotName', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .post('/plots/v2/create/polygon')
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(plot3);
      expect(response.status).toBe(201);
      plotName = { ...response, id: response.body.data.id };
    });

    it('GET created plot should have a name', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get('/plots/externalId/45789')
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(200);
      expect(response.body.plotName).toBeTruthy();
      expect(response.body.plotName).toBe('Ownerid12');
    });

    it('PATCH should be able to update a plot name', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const updatePlotName = {
        plotName: faker.datatype.string(5),
      };
      const response = await request(app.getHttpServer())
        .patch(`/plots/v2/${plotName['id']}`)
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(updatePlotName);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('plot updated');
    });
  });

  describe('/activitytemplate e2e tests', () => {
    let token;
    it('GET should fail to get all activitytemplate without auth', async () => {
      const response = await request(app.getHttpServer()).get(
        '/activitytemplate',
      );
      expect(response.status).toBe(401);
    });

    it('GET should get an activitytemplate', async () => {
      const response = await request(app.getHttpServer())
        .get(`/activitytemplate`)
        .set('Authorization', 'bearer ' + webUserToken);
      expect(response.status).toBe(200);
    });

    it('GET should get activitytemplates without ids in response', async () => {
      const response = await request(app.getHttpServer())
        .get(`/activitytemplate`)
        .set('Authorization', 'bearer ' + webUserToken);
      expect(response.text.includes('id')).toBe(false);
    });

    it('GET should get activitytemplates with ids in response', async () => {
      const response2: any = await request(app.getHttpServer())
        .get(`/activitytemplate?detailed=all`)
        .set('Authorization', 'bearer ' + webUserToken);
      expect(response2.text.includes('id')).toBe(true);
    });
  });

  describe('/tree-species', () => {
    let testTreeSpecies = {};
    it('POST should get create a tree species', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .post('/tree-species')
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(treeSpecies);
      expect(response.status).toBe(201);
      expect(response.body.isActive).toBeDefined();
      testTreeSpecies = { ...treeSpecies, id: response.body.id };
    });

    it('GET should return all tree species', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get('/tree-species')
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(200);
    });

    it('GET should return a single tree species', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get(`/tree-species/${testTreeSpecies['id']}`)
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(200);
    });

    it('GET should NOT return a single tree species', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const response = await request(app.getHttpServer())
        .get('/tree-species/999')
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(404);
    });

    it('PATCH should update tree species', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const updateTreeSpecies = {
        code: 'anthocephalus_cadamba_updated',
      };
      const response = await request(app.getHttpServer())
        .patch(`/tree-species/1`)
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(updateTreeSpecies);
      expect(response.status).toBe(200);
    });

    it('PATCH should NOT update tree species with invalid id', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      const updateTreeSpecies = {
        code: 'anthocephalus_cadamba_test',
      };
      const response = await request(app.getHttpServer())
        .patch(`/tree-species/109`)
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(updateTreeSpecies);
      expect(response.status).toBe(404);
    });
  });

  describe('/planned activity', () => {
    it('POST should assign a user planned activity using plot ID', async () => {
      const data = {
        userID: mobileUserId,
        projectID: 7,
        plotID: 1,
      };

      const response = await request(app.getHttpServer())
        .post('/planned-activity/assign/plot')
        .set('Authorization', 'bearer ' + mobileUserToken)
        .send(data);
      expect(response.status).toBe(201);
    });

    it('POST should fail when project not found', async () => {
      const data = {
        userID: mobileUserId,
        projectID: 800,
        plotID: 1,
      };

      const response = await request(app.getHttpServer())
        .post('/planned-activity/assign/plot')
        .set('Authorization', 'bearer ' + mobileUserToken)
        .send(data);
      expect(response.status).toBe(404);
    });

    it('GET should get all planned activities assigned to a user ', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/questionnaire/planned-activity')
        .set('Authorization', 'bearer ' + mobileUserToken);
      expect(response.status).toBe(200);
    });

    it('GET should get all planned activities assigned to a user ', async () => {
      const response = await request(app.getHttpServer())
        .get('/planned-activity/user')
        .set('Authorization', 'bearer ' + mobileUserToken);
      expect(response.status).toBe(200);
    });

    it('GET should not get planned activities with status deleted', async () => {
      const data = {
        status: 'deleted',
      };
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      await request(app.getHttpServer())
        .patch('/planned-activity/1')
        .set('Authorization', 'bearer ' + result.body.data.token)
        .send(data);

      const response = await request(app.getHttpServer())
        .get('/planned-activity/1')
        .set('Authorization', 'bearer ' + result.body.data.token);
      expect(response.status).toBe(404);
    });
  });

  describe('/user-project', () => {
    it('POST should assign a user project and create planned activity', async () => {
      const data = {
        projectID: 7,
      };

      const response = await request(app.getHttpServer())
        .post('/user-projects/assign/user')
        .set('Authorization', 'bearer ' + mobileUserToken)
        .send(data);
      expect(response.status).toBe(201);
    });

    it('POST should fail on project not found', async () => {
      const data = {
        projectID: 800,
      };

      const response = await request(app.getHttpServer())
        .post('/user-projects/assign/user')
        .set('Authorization', 'bearer ' + mobileUserToken)
        .send(data);
      expect(response.status).toBe(404);
    });
  });

  // describe('/create planned activity', () => {
  //   it('Post create planned activity successfully', async () => {
  //     const response = await request(app.getHttpServer())
  //       .post('/planned-activity/create')
  //       .set('Authorization', 'bearer ' + webUserToken)
  //       .send(plannedActivity);
  //     expect(response.status).toBe(201);
  //   });

  //   it('Post create planned activity fail if user does not exist', async () => {
  //     const response = await request(app.getHttpServer())
  //       .post('/planned-activity/create')
  //       .set('Authorization', 'bearer ' + webUserToken)
  //       .send(fakePlanned);
  //     expect(response.status).toBe(404);
  //   });
  // });
});
