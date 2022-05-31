const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Organizations', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Fair Ventures Worldwide"
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "NULL"
    },
    status: {
      type: DataTypes.ENUM("active","inactive","pending"),
      allowNull: true,
      defaultValue: "inactive"
    },
    activeFrom: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    activeTo: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Organizations',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Organizations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
