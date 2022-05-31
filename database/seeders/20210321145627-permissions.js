'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      'Permissions',
      [
        {
          name: 'Create User',
          code: 99000,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'List All Users',
          code: 99001,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'List All Users-Organization',
          code: 99002,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'Update Any User',
          code: 99003,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'Update User Organization',
          code: 99004,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'View Any User',
          code: 99005,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'View User Organization',
          code: 99006,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'Delete Any User',
          code: 99007,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'Delete User-Organization',
          code: 99008,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'View Own Profile',
          code: 99009,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'Invite User',
          code: 99010,
          moduleID: 2,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'View User Info',
          code: 99011,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'Edit User Profile',
          code: 99012,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'Reset User Password',
          code: 99013,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'Data browse all activities',
          code: 99014,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'Plots browse unassigned plots',
          code: 99015,
          moduleID: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          name: 'Plots browse plots in project',
          code: 99016,
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
