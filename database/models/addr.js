const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addr', {
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
    fromhn: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    tohn: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    side: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    plus4: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    fromtyp: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    totyp: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    fromarmid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    toarmid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    arid: {
      type: DataTypes.STRING(22),
      allowNull: true
    },
    mtfcc: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    statefp: {
      type: DataTypes.STRING(2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'addr',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "addr_pkey",
        unique: true,
        fields: [
          { name: "gid" },
        ]
      },
      {
        name: "idx_tiger_addr_tlid_statefp",
        fields: [
          { name: "tlid" },
          { name: "statefp" },
        ]
      },
      {
        name: "idx_tiger_addr_zip",
        fields: [
          { name: "zip" },
        ]
      },
    ]
  });
};
