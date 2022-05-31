const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Projects', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    projectStatus: {
      type: DataTypes.ENUM("started","pending","idle"),
      allowNull: true,
      defaultValue: "pending"
    },
    organizationID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Organizations',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Projects',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Projects_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
