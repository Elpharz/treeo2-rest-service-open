'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Questionnaires', 'type', {
          type: Sequelize.DataTypes.ENUM('pre_questionnaire', 'post_questionnaire'),
          allowNull: true,
          defaultValue: null
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Questionnaires', 'type', { transaction: t })
      ]);
    });
  }
};
