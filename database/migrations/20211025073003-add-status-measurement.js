'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_Measurements_status" cascade;',
      ),
      // queryInterface.sequelize.query(
      //   'ALTER TYPE enum_Measurements_status RENAME TO enum_Measurements_status_old;',
      // ),
      queryInterface.addColumn(
        'Measurements', // table name
        'status', // new field name
        {
          type: Sequelize.ENUM(
            'recorded',
            'pre_approved',
            'pre_rejected',
            'approved',
            'rejected',
            'ignored',
          ),
          allowNull: true,
          defaultValue: 'recorded',
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface
      .removeColumn('Measurements', 'status')
      .then(() =>
        queryInterface.sequelize.query('DROP TYPE "enum_Measurements_status";'),
      );
  },
};
