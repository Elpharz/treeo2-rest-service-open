import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { v4 as uuidv4 } from 'uuid';
import { INestApplication } from '@nestjs/common';

import { faker } from '@faker-js/faker';

describe('UsersService Mock', () => {
  let service: UsersService;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: UsersService,
          useFactory: () => ({
            findAll: jest.fn(() => []),
            findOne: jest.fn(() => {}),
            remove: jest.fn(() => Promise),
            createUser: jest.fn(() => {}),
            findByEmail: jest.fn(() => {}),
            findByPayload: jest.fn(() => {}),
            confirmUserFromEmail: jest.fn(() => {}),
            updateUserStatusByEmail: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<UsersService>(UsersService);
    await app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    await service.findAll();
    expect(service.findAll).toBeDefined();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find a single user', async () => {
    await service.findOne(1);
    expect(service.findOne).toBeDefined();
    expect(service.findOne).toHaveBeenCalled();
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should delete a user', async () => {
    await service.remove(1);
    expect(service.remove).toBeDefined();
    expect(service.remove).toHaveBeenCalled();
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should find user by email', async () => {
    let email = faker.internet.email();
    await service.findByEmail(email);
    expect(service.findByEmail).toBeDefined();
    expect(service.findByEmail).toHaveBeenCalled();
    expect(service.findByEmail).toHaveBeenCalledWith(email);
  });

  it('should user from username in payload', async () => {
    let payload = {};
    await service.findByPayload({});
    expect(service.findByPayload).toBeDefined();
    expect(service.findByPayload).toHaveBeenCalled();
    expect(service.findByPayload).toHaveBeenCalledWith(payload);
  });

  it('should confirm user email', async () => {
    let searchKey = uuidv4();
    await service.confirmUserFromEmail(searchKey);
    expect(service.confirmUserFromEmail).toBeDefined();
    expect(service.confirmUserFromEmail).toHaveBeenCalled();
    expect(service.confirmUserFromEmail).toHaveBeenCalledWith(searchKey);
  });

  it('should check for isActive:False user and update status using email', async () => {
    let email = faker.internet.email();
    await service.updateUserStatusByEmail(email);
    expect(service.updateUserStatusByEmail).toBeDefined();
    expect(service.updateUserStatusByEmail).toHaveBeenCalled();
    expect(service.updateUserStatusByEmail).toHaveBeenCalledWith(email);
  });

  afterAll(async () => {
    await app.close();
  });
});

class userServiceMock {
  findAll() {
    return {};
  }

  findOne() {
    return { user: 'user' };
  }
}

describe('UserService Mock', () => {
  let app: TestingModule;
  let service: UsersService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UsersService,
      useClass: userServiceMock,
    };
    app = await Test.createTestingModule({
      providers: [UsersService, ApiServiceProvider],
    }).compile();

    service = app.get<UsersService>(UsersService);
    await app.init();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all', async () => {
    const res = await service.findAll();
    expect(res).toEqual({});
  });

  it('should return a user', async () => {
    const res = await service.findOne(1);
    expect(res).toEqual({ user: 'user' });
  });

  afterAll(async () => {
    await app.close();
  });
});
