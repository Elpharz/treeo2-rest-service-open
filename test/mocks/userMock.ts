import { faker } from '@faker-js/faker';

export const appData = {
  webSignUp: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    isActive: true,
    password: faker.internet.password(),
    gdprAccepted: true,
    email: faker.internet.email(),
    username: faker.internet.userName(),
  },
  mobileSignUp: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
    country: 'uganda',
    username: faker.internet.userName(),
    phoneNumber: '+256758550394',
    gdprAccepted: true,
  },
  failWebSignUp: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    isActive: true,
    password: faker.internet.password(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
  },
};

export const fakeUser = {
  firstName: 'Nelson',
  lastName: 'locus',
  phoneNumber: '+256700188745',
  isActive: true,
  gdprAccepted: true,
  country: 'uganda',
  email: faker.internet.email(),
  username: faker.internet.userName(),
};

export const user = {
  password: process.env.TEST_USER_PASS,
  email: 'tomas@treeo.com',
};

export const user2 = {
  password: process.env.TEST_USER_PASS,
  email: 'danny@treeo.com',
};
