const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zcta5', {
    gid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "uidx_tiger_zcta5_gid"
    },
    statefp: {
      type: DataTypes.STRING(2),
      allowNull: false,
      primaryKey: true
    },
    zcta5ce: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    classfp: {
      type: DataTypes.STRING(2),
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
      type: DataTypes.DOUBLE,
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
    partflg: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    the_geom: {
      type: DataTypes.GEOMETRY('GEOMETRY', 4269),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'zcta5',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "pk_tiger_zcta5_zcta5ce",
        unique: true,
        fields: [
          { name: "zcta5ce" },
          { name: "statefp" },
        ]
      },
      {
        name: "uidx_tiger_zcta5_gid",
        unique: true,
        fields: [
          { name: "gid" },
        ]
      },
    ]
  });
};
