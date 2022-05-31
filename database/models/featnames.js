const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('featnames', {
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
    fullname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    predirabrv: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    pretypabrv: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prequalabr: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    sufdirabrv: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    suftypabrv: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sufqualabr: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    predir: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    pretyp: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    prequal: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    sufdir: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    suftyp: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    sufqual: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    linearid: {
      type: DataTypes.STRING(22),
      allowNull: true
    },
    mtfcc: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    paflag: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    statefp: {
      type: DataTypes.STRING(2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'featnames',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "featnames_pkey",
        unique: true,
        fields: [
          { name: "gid" },
        ]
      },
      {
        name: "idx_tiger_featnames_lname",
        fields: [
        ]
      },
      {
        name: "idx_tiger_featnames_snd_name",
        fields: [
        ]
      },
      {
        name: "idx_tiger_featnames_tlid_statefp",
        fields: [
          { name: "tlid" },
          { name: "statefp" },
        ]
      },
    ]
  });
};
