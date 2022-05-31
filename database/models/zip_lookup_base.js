const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zip_lookup_base', {
    zip: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    state: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    county: {
      type: DataTypes.STRING(90),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(90),
      allowNull: true
    },
    statefp: {
      type: DataTypes.STRING(2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'zip_lookup_base',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "zip_lookup_base_pkey",
        unique: true,
        fields: [
          { name: "zip" },
        ]
      },
    ]
  });
};
