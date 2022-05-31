'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(
        'ALTER TYPE "enum_Measurements_measurement_type" RENAME TO "enum_Measurements_measurement_type_old";',
      ),
      queryInterface.sequelize.query(
        'alter table "Measurements" rename "measurement_type" to "measurement_type_old";',
      ),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface
      .removeColumn('Measurements', 'measurement_type')
      .then(() =>
        queryInterface.sequelize.query(
          'DROP TYPE "enum_Measurements_measurement_type";',
        ),
      );
  },
};
