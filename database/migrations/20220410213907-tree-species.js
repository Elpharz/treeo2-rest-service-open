'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('TreeSpecies', {
        id: {
          autoIncrement: true,
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        isActive: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        },
        version: {
          type: Sequelize.DataTypes.DOUBLE,
          allowNull: true,
        },
        matureDbhCm: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
        },
        code: {
          type: Sequelize.DataTypes.STRING(255),
          allowNull: true,
          defaultValue: 'NULL',
          unique: true,
        },
        latinName: {
          type: Sequelize.DataTypes.STRING(255),
          allowNull: true,
          defaultValue: 'NULL',
          unique: true,
        },
        matureAge: {
          type: Sequelize.DataTypes.STRING(255),
          allowNull: true,
          defaultValue: 'NULL',
        },
        trivialName: {
          type: Sequelize.DataTypes.JSONB,
          allowNull: true,
        },
        description: {
          type: Sequelize.DataTypes.JSONB,
          allowNull: true,
        },
        benefits: {
          type: Sequelize.DataTypes.JSONB,
          allowNull: true,
        },
        iconURL: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true,
        },
        agbBiomassFormula: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true,
        },
        agbCo2Formula: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true,
        },
        picturesURL: {
          type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.TEXT),
          allowNull: true,
        },
        terrestialRegions: {
          type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.TEXT),
          allowNull: true,
        },
        modifiedById: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      })
      .then(() => queryInterface.addIndex('TreeSpecies', ['id']))
      .then(() => queryInterface.addIndex('TreeSpecies', ['code']))
      .then(() => queryInterface.addIndex('TreeSpecies', ['latinName']));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TreeSpecies');
  },
};
