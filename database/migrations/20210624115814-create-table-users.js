'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      preferedLogin: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      refreshToken: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      gdprAccepted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      preferences: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'pending', 'deactivated'),
        allowNull: true,
        defaultValue: 'inactive',
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
    await queryInterface.dropTable('Users');
  },
};
