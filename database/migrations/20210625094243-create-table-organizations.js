'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Organizations', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: 'Fair Ventures Worldwide',
      },
      country: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: 'NULL',
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'pending'),
        allowNull: true,
        defaultValue: 'inactive',
      },
      activeFrom: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      activeTo: {
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
    await queryInterface.dropTable('Organizations');
  },
};
