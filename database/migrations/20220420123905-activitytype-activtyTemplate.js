'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(
        'ALTER TYPE "enum_ActivityTemplates_activityType" ADD VALUE \'tree_survey\';',
      ),
      queryInterface.sequelize.query(
        'ALTER TYPE "enum_ActivityTemplates_activityType" ADD VALUE \'one_tree\';',
      ),
    ]);
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface
      .removeColumn('ActivityTemplates', 'activityType')
      .then(() =>
        queryInterface.sequelize.query(
          'DROP TYPE "enum_ActivityTemplates_activityType";',
        ),
      );
  },
};
