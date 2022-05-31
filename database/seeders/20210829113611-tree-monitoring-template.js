'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('ActivityTemplates', [
      {
        activityType: 'tree_monitoring',
        code: 3484660,
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
