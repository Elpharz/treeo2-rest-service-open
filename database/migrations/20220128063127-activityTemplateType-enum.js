'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('ActivityTemplates', 'activityTemplateType', {
        type: Sequelize.ENUM(
          'manual', 
          'project_join_pending'
        ),
        allowNull: true,
        defaultValue: "manual"
      }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface
      .removeColumn('ActivityTemplates', 'activityTemplateType')
      .then(() =>
        queryInterface.sequelize.query(
          'DROP TYPE "enum_ActivityTemplates_activityTemplateType";',
        ),
      );
  },
};
