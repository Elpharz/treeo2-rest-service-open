const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('loader_variables', {
    tiger_year: {
      type: DataTypes.STRING(4),
      allowNull: false,
      primaryKey: true
    },
    website_root: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    staging_fold: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    data_schema: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    staging_schema: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'loader_variables',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "loader_variables_pkey",
        unique: true,
        fields: [
          { name: "tiger_year" },
        ]
      },
    ]
  });
};
