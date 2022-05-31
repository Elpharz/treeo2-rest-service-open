'use strict';

const { faker } = require('@faker-js/faker');
let Faker = faker;

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('PlannedActivities', [
      {
        userID: 4,
        plotID: null,
        activityTemplateID: 8,
        dueDate: Faker.date.soon(15),
        type: 'adhoc',
        activityID: null,
        title:
          '{"en": "Preparing Your Land", "in": "Mempersiapkan negerimu", "lg": "Nyonyola kubyetaakalyo"}',
        description:
          '{"en": "These are your first steps with Treeo on your way to become a Forestry Master!", "in": "Ini adalah langkah pertama Anda bersama Treeo dalam perjalanan Anda untuk menjadi Master Kehutanan!", "lg": "Okusobola okulonda Ekika Kyemitii Nendokwa ezokuwa, Tuyiina okusoka okumanya kubyetaaka kwooli"}',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        userID: 4,
        plotID: null,
        activityTemplateID: 7,
        type: 'adhoc',
        dueDate: Faker.date.soon(15),
        activityID: null,
        title:
          '{"en": "Preparing Your Land", "in": "Mempersiapkan negerimu", "lg": "Nyonyola kubyetaakalyo"}',
        description:
          '{"en": "These are your first steps with Treeo on your way to become a Forestry Master!", "in": "Ini adalah langkah pertama Anda bersama Treeo dalam perjalanan Anda untuk menjadi Master Kehutanan!", "lg": "Okusobola okulonda Ekika Kyemitii Nendokwa ezokuwa, Tuyiina okusoka okumanya kubyetaaka kwooli"}',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },

      {
        userID: 4,
        plotID: null,
        activityTemplateID: 7,
        type: 'onetime',
        dueDate: Faker.date.soon(15),
        activityID: null,
        title:
          '{"en": "Preparing Your Land", "in": "Mempersiapkan negerimu", "lg": "Nyonyola kubyetaakalyo"}',
        description:
          '{"en": "These are your first steps with Treeo on your way to become a Forestry Master!", "in": "Ini adalah langkah pertama Anda bersama Treeo dalam perjalanan Anda untuk menjadi Master Kehutanan!", "lg": "Okusobola okulonda Ekika Kyemitii Nendokwa ezokuwa, Tuyiina okusoka okumanya kubyetaaka kwooli"}',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        userID: 4,
        plotID: null,
        type: 'adhoc',
        activityTemplateID: 9,
        dueDate: Faker.date.soon(15),
        activityID: null,
        title:
          '{"en": "Preparing Your Land", "in": "Mempersiapkan negerimu", "lg": "Nyonyola kubyetaakalyo"}',
        description:
          '{"en": "These are your first steps with Treeo on your way to become a Forestry Master!", "in": "Ini adalah langkah pertama Anda bersama Treeo dalam perjalanan Anda untuk menjadi Master Kehutanan!", "lg": "Okusobola okulonda Ekika Kyemitii Nendokwa ezokuwa, Tuyiina okusoka okumanya kubyetaaka kwooli"}',
        configuration: `{
            "specie_codes": [
              "anthocephalus_cadamba",
              "falcataria_moluccana"
           ]
        }`,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        userID: 4,
        plotID: 1,
        type: 'onetime',
        activityTemplateID: 9,
        dueDate: Faker.date.soon(15),
        activityID: null,
        title:
          '{"en": "Preparing Your Land", "in": "Mempersiapkan negerimu", "lg": "Nyonyola kubyetaakalyo"}',
        description:
          '{"en": "These are your first steps with Treeo on your way to become a Forestry Master!", "in": "Ini adalah langkah pertama Anda bersama Treeo dalam perjalanan Anda untuk menjadi Master Kehutanan!", "lg": "Okusobola okulonda Ekika Kyemitii Nendokwa ezokuwa, Tuyiina okusoka okumanya kubyetaaka kwooli"}',
        configuration: `{
            "specie_codes": [
              "anthocephalus_cadamba",
              "falcataria_moluccana"
           ]
        }`,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
    ]);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('PlannedActivities', null, {});
  },
};
