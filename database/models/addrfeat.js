const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addrfeat', {
    gid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tlid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    statefp: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    aridl: {
      type: DataTypes.STRING(22),
      allowNull: true
    },
    aridr: {
      type: DataTypes.STRING(22),
      allowNull: true
    },
    linearid: {
      type: DataTypes.STRING(22),
      allowNull: true
    },
    fullname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lfromhn: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    ltohn: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    rfromhn: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    rtohn: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    zipl: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    zipr: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    edge_mtfcc: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    parityl: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    parityr: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    plus4l: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    plus4r: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    lfromtyp: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ltotyp: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    rfromtyp: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    rtotyp: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    offsetl: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    offsetr: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    the_geom: {
      type: DataTypes.GEOMETRY('LINESTRING', 4269),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'addrfeat',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "addrfeat_pkey",
        unique: true,
        fields: [
          { name: "gid" },
        ]
      },
      {
        name: "idx_addrfeat_geom_gist",
        fields: [
          { name: "the_geom" },
        ]
      },
      {
        name: "idx_addrfeat_tlid",
        fields: [
          { name: "tlid" },
        ]
      },
      {
        name: "idx_addrfeat_zipl",
        fields: [
          { name: "zipl" },
        ]
      },
      {
        name: "idx_addrfeat_zipr",
        fields: [
          { name: "zipr" },
        ]
      },
    ]
  });
};
