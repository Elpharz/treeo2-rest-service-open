'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Measurements', // table name
        'gpscoordinates', // new field name
        {
          type: Sequelize.GEOGRAPHY,
          allowNull: true,
          defaultValue: null,
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Measurements', 'gpsCoordinates'),
    ]);
  },
};
