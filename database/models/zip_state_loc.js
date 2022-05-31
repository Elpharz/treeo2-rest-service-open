const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zip_state_loc', {
    zip: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    stusps: {
      type: DataTypes.STRING(2),
      allowNull: false,
      primaryKey: true
    },
    statefp: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    place: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'zip_state_loc',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "zip_state_loc_pkey",
        unique: true,
        fields: [
          { name: "zip" },
          { name: "stusps" },
          { name: "place" },
        ]
      },
    ]
  });
};
