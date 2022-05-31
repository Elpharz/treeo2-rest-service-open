const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('state', {
    gid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "uidx_tiger_state_gid"
    },
    region: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    division: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    statefp: {
      type: DataTypes.STRING(2),
      allowNull: false,
      primaryKey: true
    },
    statens: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    stusps: {
      type: DataTypes.STRING(2),
      allowNull: false,
      unique: "uidx_tiger_state_stusps"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lsad: {
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
    tableName: 'state',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "idx_tiger_state_the_geom_gist",
        fields: [
          { name: "the_geom" },
        ]
      },
      {
        name: "pk_tiger_state",
        unique: true,
        fields: [
          { name: "statefp" },
        ]
      },
      {
        name: "uidx_tiger_state_gid",
        unique: true,
        fields: [
          { name: "gid" },
        ]
      },
      {
        name: "uidx_tiger_state_stusps",
        unique: true,
        fields: [
          { name: "stusps" },
        ]
      },
    ]
  });
};
