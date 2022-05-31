const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('place_lookup', {
    st_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    pl_code: {
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
    tableName: 'place_lookup',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "place_lookup_name_idx",
        fields: [
        ]
      },
      {
        name: "place_lookup_pkey",
        unique: true,
        fields: [
          { name: "st_code" },
          { name: "pl_code" },
        ]
      },
      {
        name: "place_lookup_state_idx",
        fields: [
          { name: "state" },
        ]
      },
    ]
  });
};
