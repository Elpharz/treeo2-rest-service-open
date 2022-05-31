'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('ActivityTemplates', 'pre_questionnaireID', { transaction: t }),
        queryInterface.removeColumn('ActivityTemplates', 'post_questionnaireID', { transaction: t })
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('ActivityTemplates', 'pre_questionnaireID',{
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Questionnaires',
            key: 'id',
          },
        }, { transaction: t }),
        queryInterface.addColumn('ActivityTemplates', 'post_questionnaireID',{
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Questionnaires',
            key: 'id',
          },
        }, { transaction: t }),
      ]);
    });
  },
};
