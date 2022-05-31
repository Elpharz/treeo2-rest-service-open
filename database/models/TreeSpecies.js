const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TreeSpecies', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    version: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    matureDbhCm: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "NULL",
      unique: "TreeSpecies_code_key"
    },
    latinName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "NULL",
      unique: "TreeSpecies_latinName_key"
    },
    matureAge: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "NULL"
    },
    trivialName: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    description: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    benefits: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    iconURL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    agbBiomassFormula: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    agbCo2Formula: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    picturesURL: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    terrestialRegions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    modifiedById: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'TreeSpecies',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "TreeSpecies_code_key",
        unique: true,
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "TreeSpecies_latinName_key",
        unique: true,
        fields: [
          { name: "latinName" },
        ]
      },
      {
        name: "TreeSpecies_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
