'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Activities', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      activityTemplateID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'ActivityTemplates',
          key: 'id',
        },
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      plotID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Plots',
          key: 'id',
        },
      },
      startDate: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      endDate: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      synced: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      restarted: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      mobileAppVersion: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      outsidePolygon: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      fullyCompleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      labels: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: ['NULL'],
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      commentAudio: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      totalSteps: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      preQuestionnaireID: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      preQuestionnaireData: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      duplicateData: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      postQuestionnaireID: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      postQuestionnaireData: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      deviceInformationID: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Devices',
          key: 'id',
        },
      },
      status: {
        type: Sequelize.ENUM('started', 'pending', 'idle'),
        allowNull: true,
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
    await queryInterface.dropTable('Activities');
  },
};
