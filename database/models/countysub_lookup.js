const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('countysub_lookup', {
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
    county: {
      type: DataTypes.STRING(90),
      allowNull: true
    },
    cs_code: {
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
    tableName: 'countysub_lookup',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "countysub_lookup_name_idx",
        fields: [
        ]
      },
      {
        name: "countysub_lookup_pkey",
        unique: true,
        fields: [
          { name: "st_code" },
          { name: "co_code" },
          { name: "cs_code" },
        ]
      },
      {
        name: "countysub_lookup_state_idx",
        fields: [
          { name: "state" },
        ]
      },
    ]
  });
};
