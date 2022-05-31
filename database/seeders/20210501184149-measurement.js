'use strict';
const { faker } = require('@faker-js/faker');
let Faker = faker;

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Measurements', [
      { 
        id:"66401487-5142-4113-93ae-fbfba12d239d",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        
        dateTime: Faker.date.recent().toISOString(),
        treeDBHmm: 12,
        treeHealth: "Good",
        treeHeightMm: 444,
        stepsSinceLastMeasurement: 33,
        measurement_type: "tree_measurement_manual",
        gpsLocation: Faker.address.nearbyGPSCoordinate(),
        gpsAccuracy: 3,
        additionalData: '{"age": 30, "city": "New York", "name": "John"}'
      },
      {
        id:"06097fbd-51bf-4b20-8ed9-9aa3e80f1d27",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        
        dateTime: Faker.date.recent().toISOString(),
        treeDBHmm: 442,
        treeHealth: "Poor",
        treeHeightMm: 444,
        stepsSinceLastMeasurement: 33,
        measurement_type: "tree_measurement_manual",
        gpsLocation: Faker.address.nearbyGPSCoordinate(),
        gpsAccuracy: 3,
        additionalData: '{"age": 30, "city": "New York", "name": "John"}'
      },
      {
        id:"8969812c-1a81-4ce9-af52-50ecad78718f",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        
        dateTime: Faker.date.recent().toISOString(),
        treeDBHmm: 345435,
        treeHealth: "Good",
        treeHeightMm: 3453,
        stepsSinceLastMeasurement: 3534,
        measurement_type: "tree_measurement_manual",
        gpsLocation: Faker.address.nearbyGPSCoordinate(),
        gpsAccuracy: 3,
        additionalData: '{"age": 30, "city": "New York", "name": "John"}'
      },
      {
        id:"a31e4781-ea52-4b87-9c60-82f75f22d7ec",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        
        dateTime: Faker.date.recent().toISOString(),
        treeDBHmm: 34,
        treeHealth: "Good",
        treeHeightMm: 234324,
        stepsSinceLastMeasurement: 44,
        measurement_type: "tree_measurement_manual",
        gpsLocation: Faker.address.nearbyGPSCoordinate(),
        gpsAccuracy: 3,
        additionalData: '{"age": 30, "city": "New York", "name": "John"}'
      }
    ], {});
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Measurements', null, {});
  }
};