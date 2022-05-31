'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Projects', [
      {
        name: 'Re-aforestation Munich',
        projectStatus: 'idle',
        organizationID: 1,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        name: 'Olympia Park Revival',
        projectStatus: 'pending',
        organizationID: 1,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        name: 'Hofgarten Maintance',
        projectStatus: 'pending',
        organizationID: 1,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        name: 'Mabira Forest Green Plan',
        projectStatus: 'started',
        organizationID: 2,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        name: 'Eucalyptus farmers uganda',
        projectStatus: 'pending',
        organizationID: 2,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        name: 'Downtown Jakarta Park',
        projectStatus: 'started',
        organizationID: 3,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        name: 'Not Palm Oil',
        projectStatus: 'pending',
        organizationID: 3,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
    ], {});
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Projects', null, {});
  }
};