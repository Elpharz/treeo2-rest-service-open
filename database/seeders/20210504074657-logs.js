'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'Logs',
      [
        {
          userViewedId: 4,
          viewerId: 2,
          eventType: 'user info',
          reason: 'view user info',
          host: 'localhost:9001',
          method: 'GET',
          requestUrl: '/logs/1?from=&to=',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbWFzIiwiZW1haWwiOiJ0b21hc0B0cmVlby5jb20iLCJpZCI6MiwiaWF0IjoxNjIwMTE0NzcwLCJleHAiOjE2MjAxMTgzNzB9.mjvoMPuPKX2_ARgmtRCFApLv_SyqMq9ceY8jmJk1Cs',
          error: null,
          status: 'success',
          createdAt: new Date('2021-03-04T08:11:17.000Z')
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '),
          updatedAt: new Date('2021-03-04T08:11:17.000Z')
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '),
        },
        {
          userViewedId: 4,
          viewerId: 2,
          eventType: 'user info',
          reason: 'view user info',
          host: 'localhost:9001',
          method: 'GET',
          requestUrl: '/logs/1?from=&to=',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbWFzIiwiZW1haWwiOiJ0b21hc0B0cmVlby5jb20iLCJpZCI6MiwiaWF0IjoxNjIwMTE0NzcwLCJleHAiOjE2MjAxMTgzNzB9.mjvoMPuPKX2_ARgmtRCFApLv_SyqMq9ceY8jmJk1Cs',
          error: null,
          status: 'success',
          createdAt: new Date('2021-04-04T08:11:17.000Z')
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '),
          updatedAt: new Date('2021-04-04T08:11:17.000Z')
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '),
        },
        {
          userViewedId: 3,
          viewerId: 2,
          eventType: 'user info',
          reason: 'view user info',
          host: 'localhost:9001',
          method: 'GET',
          requestUrl: '/logs/1?from=&to=',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbWFzIiwiZW1haWwiOiJ0b21hc0B0cmVlby5jb20iLCJpZCI6MiwiaWF0IjoxNjIwMTE0NzcwLCJleHAiOjE2MjAxMTgzNzB9.mjvoMPuPKX2_ARgmtRCFApLv_SyqMq9ceY8jmJk1Cs',
          error: null,
          status: 'success',
          createdAt: new Date('2021-03-04T08:11:17.000Z')
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '),
          updatedAt: new Date('2021-03-04T08:11:17.000Z')
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '),
        },
        {
          userViewedId: 4,
          viewerId: 2,
          eventType: 'user info',
          reason: 'view user info',
          host: 'localhost:9001',
          method: 'GET',
          requestUrl: '/logs/1?from=&to=',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbWFzIiwiZW1haWwiOiJ0b21hc0B0cmVlby5jb20iLCJpZCI6MiwiaWF0IjoxNjIwMTE0NzcwLCJleHAiOjE2MjAxMTgzNzB9.mjvoMPuPKX2_ARgmtRCFApLv_SyqMq9ceY8jmJk1Cs',
          error: null,
          status: 'success',
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          userViewedId: null,
          viewerId: null,
          eventType: 'logout',
          reason: 'logout user',
          host: 'localhost:9001',
          method: 'GET',
          requestUrl: '/auth/logout',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbm55IiwiZW1haWwiOiJkYW5ueUB0cmVlby5jb20iLCJpZCI6MSwiaWF0IjoxNjIwMTE1MTQyLCJleHAiOjE2MjAxMTg3NDJ9.58aBiyst9_APZ6YiLqLPr4cN5tGd2zCc1_ym08qxFg0',
          error: null,
          status: 'success',
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Logs', null, {});
  },
};
