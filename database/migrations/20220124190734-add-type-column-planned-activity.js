'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('PlannedActivities', 'type', {
          type: Sequelize.DataTypes.STRING(255),
          allowNull: true
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('PlannedActivities', 'type', { transaction: t })
      ]);
    });
  }
};
