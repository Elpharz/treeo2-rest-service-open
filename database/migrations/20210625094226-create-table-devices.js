'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Devices', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      manufacturer: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      model: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      androidVersion: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      totalRAM: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      freeRAM: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      totalInternalStorage: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      totalCardStorage: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      sensors: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: ['NULL'],
      },
      installedApps: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: ['NULL'],
      },
      advertisingID: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      screenResolution: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      cameraInformation: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      userID: {
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
    await queryInterface.dropTable('Devices');
  },
};
