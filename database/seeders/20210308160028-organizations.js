'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Organizations', [
      {
        name: 'Fairventures Worldwide (FVW)',
        country: 'germany',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        name: 'Fairventures Social Forestry (FSF)',
        country: 'uganda',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        name: 'Borneo Institue (BIT)',
        country: 'indonesia',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
    ], {});
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Organizations', null, {});
  }
};