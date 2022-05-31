'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('ActivityTemplates', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      activityType: {
        type: Sequelize.ENUM('questionnaire', 'land_survey', 'tree_monitoring'),
        allowNull: true,
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      configuration: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      pre_questionnaireID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Questionnaires',
          key: 'id',
        },
      },
      post_questionnaireID: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      projectID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Projects',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ActivityTemplates');
  },
};
