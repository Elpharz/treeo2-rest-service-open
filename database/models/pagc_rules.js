const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pagc_rules', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rule: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_custom: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'pagc_rules',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "pagc_rules_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
