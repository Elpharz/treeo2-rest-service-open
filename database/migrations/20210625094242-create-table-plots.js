'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Plots', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      area: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      externalId: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      polygon: {
        type: Sequelize.GEOMETRY('GEOMETRY', 0),
        allowNull: true,
      },
      ownerID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
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
    await queryInterface.dropTable('Plots');
  },
};
