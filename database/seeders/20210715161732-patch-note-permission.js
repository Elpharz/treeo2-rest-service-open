'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      'Permissions',
      [
        {
          name: 'Update Activity fields',
          code: 99017,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
      ],
      {},
    );
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Permissions', null, {});
  },
};
