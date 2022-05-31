const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PlannedActivities', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    plotID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Plots',
        key: 'id'
      }
    },
    activityTemplateID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ActivityTemplates',
        key: 'id'
      }
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    activityID: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Activities',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    description: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    configuration: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM("onetime","adhoc"),
      allowNull: true,
      defaultValue: "adhoc"
    },
    status: {
      type: DataTypes.ENUM("planned","completed","deleted"),
      allowNull: true,
      defaultValue: "planned"
    }
  }, {
    sequelize,
    tableName: 'PlannedActivities',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "PlannedActivities_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
