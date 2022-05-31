const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Roles', {
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
    organizationID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Organizations',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Roles',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Roles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
