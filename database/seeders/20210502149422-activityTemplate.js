'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('ActivityTemplates', [
      {
        activityType: 'questionnaire',
        code: 3456789,
        configuration: '{"soilPhotoRequired": false}',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        activityType: 'questionnaire',
        code: 3484848,
        configuration: '{"soilPhotoRequired": false}',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        activityType: 'land_survey',
        code: 3484858,
        configuration: '{"soilPhotoRequired": true}',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        activityType: 'land_survey',
        code: 3484659,
        configuration: '{"soilPhotoRequired": true}',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
    ]);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('ActivityTemplates', null, {});
  },
};
