const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('direction_lookup', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    abbrev: {
      type: DataTypes.STRING(3),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'direction_lookup',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "direction_lookup_abbrev_idx",
        fields: [
          { name: "abbrev" },
        ]
      },
      {
        name: "direction_lookup_pkey",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
