'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'TreeSpecies',
      [
        {
          isActive: true,
          version: 0.1,
          matureDbhCm: 30,
          code: "swietenia_mahagoni",
          latinName: "Swietenia mahagoni",
          matureAge: "30",
          trivialName: '{"en": "Mahogany","id": "Mahoni"}',
          description: '{"en": ""}',
          benefits:'{"en": ""}',
          iconURL: faker.image.cats(),
          picturesURL: [faker.image.cats()],
          terrestialRegions: [""],
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          isActive: true,
          version: 0.1,
          matureDbhCm: 30,
          code: "gmelina_arborea",
          latinName: "Gmelina arborea",
          matureAge: "30",
          trivialName: '{"en": "White Teak","id": "Jati Putih"}',
          description: '{"en": ""}',
          benefits:'{"en": ""}',
          iconURL: faker.image.cats(),
          picturesURL: [faker.image.cats()],
          terrestialRegions: [""],
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          isActive: true,
          version: 0.1,
          matureDbhCm: 30,
          code: "anthocephalus_macrophyllus",
          latinName: "Anthocephalus macrophyllus",
          matureAge: "30",
          trivialName: '{"en": "Red Jabon","id": "Jabon Merah"}',
          description: '{"en": ""}',
          benefits:'{"en": ""}',
          iconURL: faker.image.cats(),
          picturesURL: [faker.image.cats()],
          terrestialRegions: [""],
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        }
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('TreeSpecies', null, {});
  }
};
