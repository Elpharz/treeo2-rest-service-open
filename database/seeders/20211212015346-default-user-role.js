module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'Default Farmer',
        organizationID: 1,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        name: 'Default Farmer',
        organizationID: 2,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        name: 'Default Farmer',
        organizationID: 3,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
    ]);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
