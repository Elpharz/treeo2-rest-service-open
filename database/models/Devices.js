const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Devices', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    manufacturer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    model: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    androidVersion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    totalRAM: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    freeRAM: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    totalInternalStorage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    totalCardStorage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sensors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ["NULL"]
    },
    installedApps: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ["NULL"]
    },
    advertisingID: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    screenResolution: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cameraInformation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Devices',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Devices_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
