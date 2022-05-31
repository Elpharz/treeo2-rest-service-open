const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zip_lookup', {
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    st_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    co_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    county: {
      type: DataTypes.STRING(90),
      allowNull: true
    },
    cs_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cousub: {
      type: DataTypes.STRING(90),
      allowNull: true
    },
    pl_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    place: {
      type: DataTypes.STRING(90),
      allowNull: true
    },
    cnt: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'zip_lookup',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "zip_lookup_pkey",
        unique: true,
        fields: [
          { name: "zip" },
        ]
      },
    ]
  });
};
