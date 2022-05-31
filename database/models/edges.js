const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('edges', {
    gid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    statefp: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    countyfp: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    tlid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    tfidl: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    tfidr: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    mtfcc: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    fullname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    smid: {
      type: DataTypes.STRING(22),
      allowNull: true
    },
    lfromadd: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    ltoadd: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    rfromadd: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    rtoadd: {
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
    featcat: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    hydroflg: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    railflg: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    roadflg: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    olfflg: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    passflg: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    divroad: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    exttyp: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ttyp: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    deckedroad: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    artpath: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    persist: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    gcseflg: {
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
    tnidf: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    tnidt: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    the_geom: {
      type: DataTypes.GEOMETRY('MULTILINESTRING', 4269),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'edges',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "edges_pkey",
        unique: true,
        fields: [
          { name: "gid" },
        ]
      },
      {
        name: "idx_edges_tlid",
        fields: [
          { name: "tlid" },
        ]
      },
      {
        name: "idx_tiger_edges_countyfp",
        fields: [
          { name: "countyfp" },
        ]
      },
      {
        name: "idx_tiger_edges_the_geom_gist",
        fields: [
          { name: "the_geom" },
        ]
      },
    ]
  });
};
