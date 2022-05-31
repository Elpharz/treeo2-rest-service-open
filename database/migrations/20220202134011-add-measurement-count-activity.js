'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Activities', 'measurementCount', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Activities', 'measurementCount', { transaction: t })
      ]);
    });
  }
};
