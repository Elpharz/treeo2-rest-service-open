const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Questionnaires', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    projectID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    configuration: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    activityTemplateID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ActivityTemplates',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.ENUM("pre_questionnaire","post_questionnaire"),
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'Questionnaires',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Questionnaires_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
