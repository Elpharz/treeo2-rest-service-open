'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      'RolePermissions',
      [
        {
          roleID: 1,
          permissionID: 18,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
      ],
      {},
    );
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('RolePermissions', null, {});
  },
};
