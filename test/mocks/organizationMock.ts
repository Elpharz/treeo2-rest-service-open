import { faker } from '@faker-js/faker';

export const fakeOrganization = {
  name: faker.company.companyName(),
  country: faker.address.country(),
};

export const fakeOrganization2 = {
  name: faker.company.companyName(),
  country: faker.address.country(),
};
