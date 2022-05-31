'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('UserProjects', 'performedById', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('UserProjects', 'status', {
          type: Sequelize.DataTypes.STRING(255),
          allowNull: true,
          defaultValue: "PENDING"
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('UserProjects', 'performedById', { transaction: t }),
        queryInterface.removeColumn('UserProjects', 'status', { transaction: t })
      ]);
    });
  }
};
