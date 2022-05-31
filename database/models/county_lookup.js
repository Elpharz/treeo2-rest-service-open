const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('county_lookup', {
    st_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    co_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(90),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'county_lookup',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "county_lookup_name_idx",
        fields: [
        ]
      },
      {
        name: "county_lookup_pkey",
        unique: true,
        fields: [
          { name: "st_code" },
          { name: "co_code" },
        ]
      },
      {
        name: "county_lookup_state_idx",
        fields: [
          { name: "state" },
        ]
      },
    ]
  });
};
