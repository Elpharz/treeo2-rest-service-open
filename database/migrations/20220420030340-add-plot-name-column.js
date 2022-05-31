'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'Plots',
          'plotName',
          {
            type: Sequelize.DataTypes.STRING(),
            allowNull: true,
          },
          { transaction: t },
        ),
      ]);
    });
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Plots', 'plotName', { transaction: t }),
      ]);
    });
  },
};
