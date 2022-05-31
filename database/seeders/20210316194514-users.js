'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Daniel',
        lastName: 'Roy',
        email: 'danny@treeo.com',
        password: '$2b$12$ic3cRhvzk9Wv2XjKQm4JKOja2Tp8oZIiXy2R6ABidQS//Qu1uqjrC',
        country: 'France',
        username: 'danny',
        isActive: true,
        preferedLogin: 'email',
        status: 'active',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        firstName: 'Tomas',
        lastName: 'Vitek',
        email: 'tomas@treeo.com',
        password: '$2b$12$ic3cRhvzk9Wv2XjKQm4JKOja2Tp8oZIiXy2R6ABidQS//Qu1uqjrC',
        country: 'Chile',
        username: 'tomas',
        isActive: true,
        preferedLogin: 'email',
        status: 'active',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        firstName: 'Pavel',
        lastName: 'Matejka',
        email: 'pavel@treeo.com',
        password: '$2b$12$ic3cRhvzk9Wv2XjKQm4JKOja2Tp8oZIiXy2R6ABidQS//Qu1uqjrC',
        country: 'Jordan',
        username: 'pavel',
        isActive: true,
        preferedLogin: 'email',
        status: 'active',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        firstName: 'tester',
        lastName: 'tester',
        email: 'tester@treeo.com',
        password: '$2b$12$ic3cRhvzk9Wv2XjKQm4JKOja2Tp8oZIiXy2R6ABidQS//Qu1uqjrC',
        country: 'Indonesia',
        username: 'tester',
        isActive: true,
        preferedLogin: 'email',
        status: 'active',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        firstName: 'Laku',
        lastName: 'Tunete',
        email: 'laku@fairventures.org',
        phoneNumber: '2340009993',
        password: '$2b$12$ic3cRhvzk9Wv2XjKQm4JKOja2Tp8oZIiXy2R6ABidQS//Qu1uqjrC',
        country: 'Indonesia',
        username: 'laku',
        isActive: true,
        preferedLogin: 'email',
        status: 'active',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
    ], {});
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};