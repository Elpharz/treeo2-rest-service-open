'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questionnaires', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      projectID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Projects',
          key: 'id',
        },
      },
      configuration: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    }, {
      Sequelize,
      tableName: 'Questionnaires',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: "Questionnaires_pkey",
          unique: true,
          fields: [
            { name: "id" },
          ]
        },
      ]
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Questionnaires');
  },
};
