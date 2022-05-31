'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Logs', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      eventType: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      userViewedId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      viewerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dataViewed: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      reason: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      host: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      method: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      requestUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      token: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      error: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(255),
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
    await queryInterface.dropTable('Logs');
  },
};
