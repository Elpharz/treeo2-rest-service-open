'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('ActivityTemplates', 'isActive', {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('ActivityTemplates', 'isActive', { transaction: t }),
      ]);
    });
  }
};
