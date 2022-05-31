'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserProjects', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      projectID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Projects',
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
      roleID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      valid_from: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: 'NULL',
      },
      valid_to: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: 'NULL',
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
    await queryInterface.dropTable('UserProjects');
  },
};
