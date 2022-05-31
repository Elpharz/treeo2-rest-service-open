const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('secondary_unit_lookup', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    abbrev: {
      type: DataTypes.STRING(5),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'secondary_unit_lookup',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "secondary_unit_lookup_abbrev_idx",
        fields: [
          { name: "abbrev" },
        ]
      },
      {
        name: "secondary_unit_lookup_pkey",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
