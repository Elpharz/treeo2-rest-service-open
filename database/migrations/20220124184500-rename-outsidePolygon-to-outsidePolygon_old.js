'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.sequelize.query(
          'alter table "Activities" rename "outsidePolygon" to "outsidePolygon_old";',
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Activities', 'outsidePolygon_old', { transaction: t })
      ]);
    });
  }
};
