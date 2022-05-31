'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Measurements', 'images', {
          type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.TEXT),
          allowNull: true
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Measurements', 'images', { transaction: t })
      ]);
    });
  }
};
