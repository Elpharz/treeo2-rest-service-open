const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AdminInvitations', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("pending","accepted","declined"),
      allowNull: true,
      defaultValue: "pending"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'AdminInvitations',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "AdminInvitations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
