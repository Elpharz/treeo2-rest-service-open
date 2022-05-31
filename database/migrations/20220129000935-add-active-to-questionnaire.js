'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Questionnaires', 'active', {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Questionnaires', 'active', { transaction: t })
      ]);
    });
  }
};
