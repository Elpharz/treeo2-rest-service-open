const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ActivityTemplates', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    activityType: {
      type: DataTypes.ENUM("questionnaire","land_survey","tree_monitoring","one_tree","tree_survey"),
      allowNull: true
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    configuration: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    title: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    description: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    autoGenerateOffset: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    activityTemplateType: {
      type: DataTypes.ENUM("manual","project_join_pending"),
      allowNull: true,
      defaultValue: "manual"
    },
    projectID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    frequency: {
      type: DataTypes.ENUM("onetime","adhoc"),
      allowNull: true,
      defaultValue: "adhoc"
    }
  }, {
    sequelize,
    tableName: 'ActivityTemplates',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "ActivityTemplates_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
