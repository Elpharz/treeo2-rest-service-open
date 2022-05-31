'use strict';
module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('ActivityTemplates', [
      {
        activityType: 'one_tree',
        code: 3484799,
        projectID: 6, // TODO: CHANGE THIS ID IN PRODUCTION TO 46
        title:
          '{"en": "Measure one tree", "id": "Ukur satu pohon", "lg": "Measure one tree"}',
        description:
          '{"en": "Carry out a one tree measurement", "id": "Lakukan pengukuran satu pohon", "lg": "Carry out a one tree measurement" }',
        activityTemplateType: 'project_join_pending',
        isActive: true,
        frequency: 'adhoc',
        configuration: `{
          "specie_codes": [
            "anthocephalus_cadamba",
            "falcataria_moluccana",
            "acacia_mangium",
            "swietenia_mahagoni",
            "gmelina_arborea",
            "anthocephalus_macrophyllus"
         ]
        }`,
        autoGenerateOffset: null,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        activityType: 'tree_survey',
        code: 3484800,
        projectID: 6, // TODO: CHANGE THIS ID IN PRODUCTION TO 46
        title:
          '{"en": "Do a tree survey on a plot", "id": "Lakukan survei pohon pada sebidang", "lg":"Do a tree survey on a plot"}',
        description:
          '{"en": "Carry out tree survey on a plot", "id": "Lakukan survei pohon di plot", "lg":"Carry out tree survey on a plot" }',
        activityTemplateType: 'project_join_pending',
        isActive: true,
        configuration: `{
          "specie_codes": [
            "anthocephalus_cadamba",
            "falcataria_moluccana",
            "acacia_mangium",
            "swietenia_mahagoni",
            "gmelina_arborea",
            "anthocephalus_macrophyllus"
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
