const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PlotProjects', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    plotID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Plots',
        key: 'id'
      }
    },
    projectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Projects',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM("active","deleted"),
      allowNull: true,
      defaultValue: "active"
    }
  }, {
    sequelize,
    tableName: 'PlotProjects',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "PlotProjects_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
