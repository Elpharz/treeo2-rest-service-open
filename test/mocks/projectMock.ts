import { faker } from '@faker-js/faker';

export const fakeProject = {
  name: faker.address.city(),
  projectStatus: 'idle',
  organizationID: 1,
};
