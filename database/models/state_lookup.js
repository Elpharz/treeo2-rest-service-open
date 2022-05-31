const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('state_lookup', {
    st_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: true,
      unique: "state_lookup_name_key"
    },
    abbrev: {
      type: DataTypes.STRING(3),
      allowNull: true,
      unique: "state_lookup_abbrev_key"
    },
    statefp: {
      type: DataTypes.CHAR(2),
      allowNull: true,
      unique: "state_lookup_statefp_key"
    }
  }, {
    sequelize,
    tableName: 'state_lookup',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "state_lookup_abbrev_key",
        unique: true,
        fields: [
          { name: "abbrev" },
        ]
      },
      {
        name: "state_lookup_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "state_lookup_pkey",
        unique: true,
        fields: [
          { name: "st_code" },
        ]
      },
      {
        name: "state_lookup_statefp_key",
        unique: true,
        fields: [
          { name: "statefp" },
        ]
      },
    ]
  });
};
