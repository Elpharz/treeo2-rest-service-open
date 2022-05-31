const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Measurements', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    dateTime: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    treeDBHmm: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    treeHealth: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    treeHeightMm: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stepsSinceLastMeasurement: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    measurement_type: {
      type: DataTypes.ENUM("land_photo","soil_photo","tree_measurement_auto","tree_measurement_manual","tree_measurement_auto_not_detected","tree_measurement_auto_rejected","tree_evidence","tree_evidence_rejected"),
      allowNull: true
    },
    gpsLocation: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "NULL"
    },
    gpscoordinates: {
      type: DataTypes.GEOGRAPHY('Geometry', 0),
      allowNull: true
    },
    gpsAccuracy: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    additionalData: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    duplicateData: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("recorded","pre_approved","pre_rejected","approved","rejected","ignored"),
      allowNull: true,
      defaultValue: "recorded"
    },
    activityID: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Activities',
        key: 'id'
      }
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Measurements',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Measurements_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
