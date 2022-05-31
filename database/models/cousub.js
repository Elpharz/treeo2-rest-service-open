const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cousub', {
    gid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "uidx_cousub_gid"
    },
    statefp: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    countyfp: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    cousubfp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    cousubns: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    cosbidfp: {
      type: DataTypes.STRING(10),
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
    cnectafp: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    nectafp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    nctadvfp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    funcstat: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    aland: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    awater: {
      type: DataTypes.DECIMAL,
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
    tableName: 'cousub',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "cousub_pkey",
        unique: true,
        fields: [
          { name: "cosbidfp" },
        ]
      },
      {
        name: "tige_cousub_the_geom_gist",
        fields: [
          { name: "the_geom" },
        ]
      },
      {
        name: "uidx_cousub_gid",
        unique: true,
        fields: [
          { name: "gid" },
        ]
      },
    ]
  });
};
