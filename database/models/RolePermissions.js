const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RolePermissions', {
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Roles',
        key: 'id'
      }
    },
    permissionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Permissions',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'RolePermissions',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "RolePermissions_pkey",
        unique: true,
        fields: [
          { name: "roleID" },
          { name: "permissionID" },
        ]
      },
    ]
  });
};
