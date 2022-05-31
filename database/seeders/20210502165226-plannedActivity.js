'use strict';

const { faker } = require('@faker-js/faker');
let Faker = faker;

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('PlannedActivities', [
      {
        userID: 4,
        plotID: null,
        activityTemplateID: 1,
        dueDate: Faker.date.soon(15),
        activityID: null,
        title:
          '{"en": "Preparing Your Land", "in": "Mempersiapkan negerimu", "lg": "Nyonyola kubyetaakalyo"}',
        description:
          '{"en": "These are your first steps with Treeo on your way to become a Forestry Master!", "in": "Ini adalah langkah pertama Anda bersama Treeo dalam perjalanan Anda untuk menjadi Master Kehutanan!", "lg": "Okusobola okulonda Ekika Kyemitii Nendokwa ezokuwa, Tuyiina okusoka okumanya kubyetaaka kwooli"}',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
    ]);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('PlannedActivities', null, {});
  },
};
