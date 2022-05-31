'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(
        'ALTER TYPE "enum_Measurements_measurement_type" ADD VALUE \'soil_photo\';',
      ),
      queryInterface.sequelize.query(
        'ALTER TYPE "enum_Measurements_measurement_type" ADD VALUE \'tree_measurement_auto\';',
      ),
      queryInterface.sequelize.query(
        'ALTER TYPE "enum_Measurements_measurement_type" ADD VALUE \'tree_measurement_manual\';',
      ),
      queryInterface.sequelize.query(
        'ALTER TYPE "enum_Measurements_measurement_type" ADD VALUE \'tree_measurement_auto_not_detected\';',
      ),
      queryInterface.sequelize.query(
        'ALTER TYPE "enum_Measurements_measurement_type" ADD VALUE \'tree_measurement_auto_rejected\';',
      ),
      queryInterface.sequelize.query(
        'ALTER TYPE "enum_Measurements_measurement_type" ADD VALUE \'tree_evidence\';',
      ),
      queryInterface.sequelize.query(
        'ALTER TYPE "enum_Measurements_measurement_type" ADD VALUE \'tree_evidence_rejected\';',
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
