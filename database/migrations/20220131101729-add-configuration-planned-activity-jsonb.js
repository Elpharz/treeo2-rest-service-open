'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('PlannedActivities', 'configuration', {
          type: Sequelize.DataTypes.JSONB,
          allowNull: true,
          defaultValue: null
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('PlannedActivities', 'configuration', { transaction: t }),
      ]);
    });
  }
};
