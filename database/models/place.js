const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('place', {
    gid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "uidx_tiger_place_gid"
    },
    statefp: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    placefp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    placens: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    plcidfp: {
      type: DataTypes.STRING(7),
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
    cpi: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    pcicbsa: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    pcinecta: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    mtfcc: {
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
      type: DataTypes.BIGINT,
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
    tableName: 'place',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "place_pkey",
        unique: true,
        fields: [
          { name: "plcidfp" },
        ]
      },
      {
        name: "tiger_place_the_geom_gist",
        fields: [
          { name: "the_geom" },
        ]
      },
      {
        name: "uidx_tiger_place_gid",
        unique: true,
        fields: [
          { name: "gid" },
        ]
      },
    ]
  });
};
