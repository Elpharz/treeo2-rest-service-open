'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return Promise.all([
      queryInterface.addColumn(
        'Plots', // table name
        'status', // new field name
        {
          type: DataTypes.ENUM('active', 'deleted'),
          allowNull: true,
          defaultValue: 'active',
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface
      .removeColumn('Plots', 'status')
      .then(() =>
        queryInterface.sequelize.query('DROP TYPE "enum_Plots_status";'),
      );
  },
};
