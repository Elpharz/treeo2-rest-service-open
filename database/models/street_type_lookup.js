const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('street_type_lookup', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    abbrev: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    is_hw: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'street_type_lookup',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "street_type_lookup_abbrev_idx",
        fields: [
          { name: "abbrev" },
        ]
      },
      {
        name: "street_type_lookup_pkey",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
