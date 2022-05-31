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
        dueDate: null, // null because it's ad-hoc
        type: 'adhoc',
        activityID: null,
        status: 'planned',
        title: '{"en": "1 Tree Measurement"}',
        description: '{"en": "Try tree scanner on one tree for free"}',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        userID: 4,
        plotID: null,
        activityTemplateID: 7,
        type: 'adhoc',
        dueDate: null, // null because it's ad-hoc
        activityID: null,
        status: 'planned',
        title: '{"en": "Measure your land"}',
        description:
          '{"en": "Measure your land first to join the tree planting project"}',
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
        status: 'planned',
        title: '{"en": "Measure your land first"}',
        description:
          '{"en": "Start tree planting by answering a few questions and taking pictures of your land"}',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        userID: 4,
        plotID: null,
        type: 'adhoc',
        activityTemplateID: 9,
        dueDate: null, // null because it's ad-hoc
        activityID: null,
        title: '{"en": "Record trees on a new plot" }',
        status: 'planned',
        description:
          '{"en": "Join the carbon project by recording every single tree on your land"}',
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
        status: 'planned',
        title: '{"en": "Measure trees on your own plot" }',
        description:
          '{"en": "You are required to carry out a tree survey for your plot1"}',
        configuration: `{
            "specie_codes": [
              "anthocephalus_cadamba",
              "falcataria_moluccana",
              "acacia_mangium"
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
