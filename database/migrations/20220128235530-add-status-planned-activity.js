'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('PlannedActivities', 'status', {
        type: Sequelize.ENUM(
          'planned', 'completed', 'deleted'
        ),
        allowNull: true,
      }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface
      .removeColumn('PlannedActivities', 'status')
      .then(() =>
        queryInterface.sequelize.query(
          'DROP TYPE "enum_PlannedActivities_status";',
        ),
      );
  },
};
