'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('ActivityTemplates', 'autoGenerateOffset', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('ActivityTemplates', 'autoGenerateOffset', { transaction: t }),
      ]);
    });
  }
};
