'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Activities', 'activityType', {
        type: Sequelize.ENUM(
          'land_survey', 'questionnaire', 'one_tree', 'tree_survey'
        ),
        allowNull: true,
        defaultValue: 'land_survey'
      }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface
      .removeColumn('Activities', 'activityType')
      .then(() =>
        queryInterface.sequelize.query(
          'DROP TYPE "enum_Activities_activityType";',
        ),
      );
  },
};
