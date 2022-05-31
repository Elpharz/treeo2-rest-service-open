'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('ActivityTemplates', [
      {
        activityType: 'land_survey',
        code: 3484790,
        projectID: 5,
        isActive: true,
        title:
          '{"en": "Record your land", "in": "Rekam tanah Anda", "lg": "Record your land"}',
        description:
          '{"en": "Carry out a land survey", "in": "Melakukan survey tanah", "lg": "Carry out a land survey"}',
        activityTemplateType: 'project_join_pending',
        configuration: '{"soilPhotoRequired": true}',
        autoGenerateOffset: 1,
        frequency: 'onetime',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        activityType: 'one_tree',
        code: 3484791,
        projectID: 5,
        title:
          '{"en": "Measure one tree", "in": "Ukur satu pohon", "lg": "Measure one tree"}',
        description:
          '{"en": "Carry out a one tree measurement", "in": "Lakukan pengukuran satu pohon", "lg": "Carry out a one tree measurement" }',
        activityTemplateType: 'project_join_pending',
        isActive: true,
        frequency: 'adhoc',
        configuration: `{
          "specie_codes": [
            "anthocephalus_cadamba",
            "falcataria_moluccana",
            "acacia_mangium"
         ]
        }`,
        autoGenerateOffset: null,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        activityType: 'tree_survey',
        code: 3484792,
        projectID: 5,
        title:
          '{"en": "Do a tree survey on a plot", "in": "Lakukan survei pohon pada sebidang", "lg":"Do a tree survey on a plot"}',
        description:
          '{"en": "Carry out tree survey a plot", "in": "Lakukan survei pohon di plot", "lg":"Carry out tree survey a plot" }',
        activityTemplateType: 'project_join_pending',
        isActive: true,
        configuration: `{
          "specie_codes": [
            "anthocephalus_cadamba",
            "falcataria_moluccana"
         ]
        }`,
        frequency: 'adhoc',
        autoGenerateOffset: null,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        activityType: 'tree_survey',
        code: 3484793,
        projectID: 5,
        title:
          '{"en": "Do a tree survey", "in":"Lakukan survei pohon", "lg":"Do a tree survey"}',
        description:
          '{"en": "Carry out a tree survey measurement", "in":"Lakukan pengukuran survei pohon", "lg":"Carry out a tree survey measurement" }',
        activityTemplateType: 'project_join_pending',
        isActive: true,
        configuration: `{
          "specie_codes": [
            "anthocephalus_cadamba",
            "falcataria_moluccana"
         ]
        }`,
        frequency: 'adhoc',
        autoGenerateOffset: null,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
    ]);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('ActivityTemplates', null, {});
  },
};
