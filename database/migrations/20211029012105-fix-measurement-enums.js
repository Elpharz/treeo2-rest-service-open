'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Measurements', 'measurement_type', {
        type: Sequelize.ENUM(
          'land_photo',
          'soil_photo',
          'tree_measurement_auto',
          'tree_measurement_manual',
          'tree_measurement_auto_not_detected',
          'tree_measurement_auto_rejected',
          'tree_evidence',
          'tree_evidence_rejected',
        ),
        allowNull: true,
      }),
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
