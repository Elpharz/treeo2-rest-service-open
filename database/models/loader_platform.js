const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('loader_platform', {
    os: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    declare_sect: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pgbin: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    wget: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    unzip_command: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    psql: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    path_sep: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loader: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    environ_set_command: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    county_process_command: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'loader_platform',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "loader_platform_pkey",
        unique: true,
        fields: [
          { name: "os" },
        ]
      },
    ]
  });
};
