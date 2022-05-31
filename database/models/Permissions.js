const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Permissions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "Permissions_code_key"
    },
    moduleID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TModules',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Permissions',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Permissions_code_key",
        unique: true,
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "Permissions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
