const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserProjects', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    projectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Projects',
        key: 'id'
      }
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Roles',
        key: 'id'
      }
    },
    performedById: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    valid_from: {
      type: DataTypes.DATE,
      allowNull: true
    },
    valid_to: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "PENDING"
    }
  }, {
    sequelize,
    tableName: 'UserProjects',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "UserProjects_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
