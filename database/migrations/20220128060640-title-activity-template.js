'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('ActivityTemplates', 'title', {
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
        queryInterface.removeColumn('ActivityTemplates', 'title', { transaction: t }),
      ]);
    });
  }
};
