'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.sequelize.query('alter table "UserProjects" rename "valid_from" to "valid_from_old";', { transaction: t }),
        queryInterface.sequelize.query('alter table "UserProjects" rename "valid_to" to "valid_to_old";', { transaction: t }),
        queryInterface.addColumn('UserProjects', 'valid_from', {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
          defaultValue: null
        }, { transaction: t }),
        queryInterface.addColumn('UserProjects', 'valid_to', {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
          defaultValue: null
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('UserProjects', 'valid_from', { transaction: t }),
        queryInterface.removeColumn('UserProjects', 'valid_to', { transaction: t }),
      ]);
    });
  }
};
