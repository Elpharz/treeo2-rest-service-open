'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Measurements', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      dateTime: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      treeDBHmm: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      treeHealth: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      treeHeightMm: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      stepsSinceLastMeasurement: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      measurement_type: {
        type: Sequelize.ENUM('dbh_auto', 'manual', 'land'),
        allowNull: true,
      },
      gpsLocation: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: 'NULL',
      },
      gpsAccuracy: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      additionalData: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      duplicateData: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      activityID: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Activities',
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
    await queryInterface.dropTable('Measurements');
  },
};
