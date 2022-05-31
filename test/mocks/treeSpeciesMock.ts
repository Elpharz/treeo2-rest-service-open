import { faker } from '@faker-js/faker';

export const treeSpecies = {
  isActive: faker.datatype.boolean(),
  version: faker.datatype.float({ max: 10 }),
  matureDbhCm: faker.datatype.number({ max: 100 }),
  code: faker.datatype.string(10),
  latinName: faker.name.middleName(),
  matureAge: faker.datatype.number({ max: 100 }).toString(),
  iconURL: faker.image.cats(),
  agbBiomassFormula: 'x+y',
  agbCo2Formula: 'x*y',
  picturesURL: [faker.image.cats()],
  terrestialRegions: [faker.address.country(), faker.address.country()],
  trivialName: faker.datatype.json(),
  description: faker.datatype.json(),
  benefits: faker.datatype.json(),
};
