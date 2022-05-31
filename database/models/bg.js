const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bg', {
    gid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statefp: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    countyfp: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    tractce: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    blkgrpce: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    bg_id: {
      type: DataTypes.STRING(12),
      allowNull: false,
      primaryKey: true
    },
    namelsad: {
      type: DataTypes.STRING(13),
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
    the_geom: {
      type: DataTypes.GEOMETRY('MULTIPOLYGON', 4269),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bg',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "bg_pkey",
        unique: true,
        fields: [
          { name: "bg_id" },
        ]
      },
    ]
  });
};
