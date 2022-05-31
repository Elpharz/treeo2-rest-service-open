const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('county', {
    gid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "uidx_county_gid"
    },
    statefp: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    countyfp: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    countyns: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    cntyidfp: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    namelsad: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lsad: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    classfp: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    mtfcc: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    csafp: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    cbsafp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    metdivfp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    funcstat: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    aland: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    awater: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    intptlat: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    intptlon: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    the_geom: {
      type: DataTypes.GEOMETRY('MULTIPOLYGON', 4269),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'county',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "idx_tiger_county",
        fields: [
          { name: "countyfp" },
        ]
      },
      {
        name: "pk_tiger_county",
        unique: true,
        fields: [
          { name: "cntyidfp" },
        ]
      },
      {
        name: "uidx_county_gid",
        unique: true,
        fields: [
          { name: "gid" },
        ]
      },
    ]
  });
};
