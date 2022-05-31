'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'ActivityTemplates',
          'frequency',
          {
            type: Sequelize.DataTypes.ENUM('onetime', 'adhoc'),
            allowNull: true,
            defaultValue: 'adhoc',
          },
          { transaction: t },
        ),
      ]);
    });
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('ActivityTemplates', 'frequency', {
          transaction: t,
        }),
      ]);
    });
  },
};
