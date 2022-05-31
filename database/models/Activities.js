const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Activities', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    activityTemplateID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ActivityTemplates',
        key: 'id'
      }
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    synced: {
      type: DataTypes.DATE,
      allowNull: true
    },
    restarted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mobileAppVersion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    outsidePolygon: {
      type: DataTypes.GEOMETRY('GEOMETRY', 0),
      allowNull: true
    },
    fullyCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    labels: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ["NULL"]
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    commentAudio: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    measurementCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    totalSteps: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    preQuestionnaireID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    preQuestionnaireData: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    duplicateData: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    postQuestionnaireID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    postQuestionnaireData: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    deviceInformationID: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Devices',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM("completed","rejected","partially_recorded","recorded","pre_approved","pre_rejected","approved"),
      allowNull: true,
      defaultValue: "partially_recorded"
    },
    activityType: {
      type: DataTypes.ENUM("land_survey","questionnaire","one_tree","tree_survey"),
      allowNull: true,
      defaultValue: "tree_survey"
    }
  }, {
    sequelize,
    tableName: 'Activities',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Activities_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
