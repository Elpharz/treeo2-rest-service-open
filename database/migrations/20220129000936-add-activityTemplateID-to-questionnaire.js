'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Questionnaires', 'activityTemplateID', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Questionnaires', 'activityTemplateID', { transaction: t })
      ]);
    });
  }
};
