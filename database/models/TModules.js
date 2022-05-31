const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TModules', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'TModules',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "TModules_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
