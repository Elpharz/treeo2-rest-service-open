const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zip_lookup_all', {
    zip: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    st_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    co_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    county: {
      type: DataTypes.STRING(90),
      allowNull: true
    },
    cs_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cousub: {
      type: DataTypes.STRING(90),
      allowNull: true
    },
    pl_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    place: {
      type: DataTypes.STRING(90),
      allowNull: true
    },
    cnt: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'zip_lookup_all',
    schema: 'tiger',
    timestamps: false
  });
};
