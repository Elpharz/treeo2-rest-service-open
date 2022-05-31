'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('PlotProjects', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      plotID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Plots',
          key: 'id',
        },
      },
      projectID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Projects',
          key: 'id',
        },
      },
      status: {
        type: Sequelize.ENUM('active', 'deleted'),
        allowNull: true,
        defaultValue: 'active',
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
    await queryInterface.dropTable('PlotProjects');
  },
};
