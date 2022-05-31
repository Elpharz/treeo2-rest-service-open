'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Activities',
      [
        {
          id: '5e1b0441-13b5-4d0f-abe1-005ee148aad4',
          activityTemplateID: 1,
          userID: 2,
          plotID: null,
          startDate: '2021-09-13 14:11:26.942',
          endDate: '2021-09-13 14:11:26.942',
          synced: '2021-09-13 14:11:26.942',
          restarted: 0,
          mobileAppVersion: '2.201',
          outsidePolygon: null,
          fullyCompleted: true,
          labels: ['test', 'something else'],
          comment: 'test',
          commentAudio: 'http://www.test.com',
          totalSteps: 6,
          preQuestionnaireID: 1,
          preQuestionnaireData: null,
          postQuestionnaireID: null,
          postQuestionnaireData: null,
          deviceInformationID: null,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Activities', null, {});
  },
};
