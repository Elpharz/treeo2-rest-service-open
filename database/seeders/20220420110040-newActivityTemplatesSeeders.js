'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('ActivityTemplates', [
      {
        activityType: 'land_survey',
        code: 3484858,
        projectID: 7,
        isActive: true,
        title:
          '{"en": "Preparing Your Land", "in": "Mempersiapkan negerimu", "lg": "Nyonyola kubyetaakalyo"}',
        description:
          '{"en": "These are your first steps with Treeo on your way to become a Forestry Master!", "in": "Ini adalah langkah pertama Anda bersama Treeo dalam perjalanan Anda untuk menjadi Master Kehutanan!", "lg": "Okusobola okulonda Ekika Kyemitii Nendokwa ezokuwa, Tuyiina okusoka okumanya kubyetaaka kwooli"}',
        activityTemplateType: 'project_join_pending',
        configuration: '{"soilPhotoRequired": false}',
        autoGenerateOffset: 1,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        activityType: 'one_tree',
        code: 3484659,
        projectID: 7,
        title: '{"en": "Measure one tree"}',
        description: '{"en": "Test treeo and measure one tree" }',
        activityTemplateType: 'project_join_pending',
        isActive: true,
        configuration: `{
          "specie_codes": [
            "anthocephalus_cadamba",
            "falcataria_moluccana",
            "acacia_mangium"
         ]
        }`,
        autoGenerateOffset: 2,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        activityType: 'tree_survey',
        code: 3484789,
        projectID: 7,
        title: '{"en": "Tree survey"}',
        description: '{"en": "Test treeo and do tree survey" }',
        activityTemplateType: 'project_join_pending',
        isActive: true,
        configuration: `{
          "specie_codes": [
            "anthocephalus_cadamba",
            "falcataria_moluccana"
         ]
        }`,
        autoGenerateOffset: 48,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
    ]);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('ActivityTemplates', null, {});
  },
};
