'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Activities', 'outsidePolygon', {
          type: Sequelize.DataTypes.GEOMETRY,
          allowNull: true
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Activities', 'outsidePolygon', { transaction: t })
      ]);
    });
  }
};
