const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "Users_phoneNumber_key"
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "Users_username_key"
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    preferedLogin: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    refreshToken: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    gdprAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    preferences: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("active","inactive","pending","deactivated"),
      allowNull: true,
      defaultValue: "inactive"
    }
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Users_phoneNumber_key",
        unique: true,
        fields: [
          { name: "phoneNumber" },
        ]
      },
      {
        name: "Users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "Users_username_key",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "users_email",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
