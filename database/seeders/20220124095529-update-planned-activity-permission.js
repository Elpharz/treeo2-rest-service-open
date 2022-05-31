'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Permissions', [
      {
        name: 'update user permission',
        code: 99020,
        moduleID: 1,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Permissions', null, {});
  },
};
