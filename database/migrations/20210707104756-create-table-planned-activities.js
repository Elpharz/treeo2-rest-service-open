'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('PlannedActivities', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      plotID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Plots',
          key: 'id',
        },
      },
      activityTemplateID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ActivityTemplates',
          key: 'id',
        },
      },
      dueDate: {
        type: Sequelize.DATE,
      },
      activityID: {
        type: Sequelize.UUID,
        references: {
          model: 'Activities',
          key: 'id',
        },
      },
      title: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      description: {
        type: Sequelize.JSONB,
        allowNull: true
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
    await queryInterface.dropTable('PlannedActivities');
  },
};
