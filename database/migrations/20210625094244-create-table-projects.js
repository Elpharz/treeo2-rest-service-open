'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects', {
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
      projectStatus: {
        type: Sequelize.ENUM('started', 'pending', 'idle'),
        allowNull: true,
        defaultValue: 'pending',
      },
      organizationID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Organizations',
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
    await queryInterface.dropTable('Projects');
  },
};
