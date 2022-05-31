'use strict';
module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('ActivityTemplates', [
      {
        activityType: 'land_survey',
        code: 3484793,
        projectID: 5, // TODO: FIX HERE 29
        isActive: true,
        title:
          '{"en": "Map the land", "id": "Rekam tanah Anda", "lg": "Record your land"}',
        description:
          '{"en": "Map your land and join tree planting project", "id": "Petakan lahan Anda dan bergabunglah dengan proyek penanaman pohon", "lg": "Map your land and join tree planting project"}',
        activityTemplateType: 'project_join_pending',
        configuration: '{"soilPhotoRequired": true}',
        autoGenerateOffset: 1,
        frequency: 'onetime',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        activityType: 'one_tree',
        code: 3484794,
        projectID: 5, // TODO: FIX HERE 29
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
        code: 3484795,
        projectID: 5, // TODO: FIX HERE 29
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
      {
        activityType: 'land_survey',
        code: 3484796,
        projectID: 5, // TODO: FIX HERE 31
        isActive: true,
        title:
          '{"en": "Map the land", "id": "Rekam tanah Anda", "lg": "Record your land"}',
        description:
          '{"en": "Map your land and join tree planting project", "id": "Petakan lahan Anda dan bergabunglah dengan proyek penanaman pohon", "lg": "Map your land and join tree planting project"}',
        activityTemplateType: 'project_join_pending',
        configuration: '{"soilPhotoRequired": true}',
        autoGenerateOffset: 1,
        frequency: 'onetime',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        activityType: 'one_tree',
        code: 3484797,
        projectID: 5, // TODO: FIX HERE 31
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
        code: 3484798,
        projectID: 5, // TODO: FIX HERE 31
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
