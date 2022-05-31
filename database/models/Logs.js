const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Logs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    eventType: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userViewedId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    viewerId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dataViewed: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reason: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    host: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    method: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    requestUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    error: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Logs',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Logs_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
