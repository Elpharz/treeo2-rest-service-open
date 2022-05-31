const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Plots', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    externalId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    polygon: {
      type: DataTypes.GEOMETRY('GEOMETRY', 0),
      allowNull: true
    },
    ownerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM("active","deleted"),
      allowNull: true,
      defaultValue: "active"
    },
    plotName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "NULL"
    }
  }, {
    sequelize,
    tableName: 'Plots',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Plots_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
