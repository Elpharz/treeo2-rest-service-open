require('dotenv').config();

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,

    // DO NOT REMOVE. NEEDED FOR LOCAL TESTING
    // Use a different storage type. Default: sequelize
    // "migrationStorage": "json",

    // Use a different file name. Default: sequelize-meta.json
    // "migrationStoragePath": "sequelizeMeta.json",
  },
  test: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE_TEST,
  },
  production: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  },
};
