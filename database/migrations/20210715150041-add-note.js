module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Activities', // table name
        'note', // new field name
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([queryInterface.removeColumn('Activities', 'note')]);
  },
};
