const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('geocode_settings', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    setting: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    unit: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    short_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'geocode_settings',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "geocode_settings_pkey",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
