'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Permissions', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'Permissions_code_key',
      },
      moduleID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'TModules',
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
    await queryInterface.dropTable('Permissions');
  },
};
