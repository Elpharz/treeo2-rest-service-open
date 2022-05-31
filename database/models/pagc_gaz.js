const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pagc_gaz', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    seq: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    word: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    stdword: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    token: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_custom: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'pagc_gaz',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "pagc_gaz_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
