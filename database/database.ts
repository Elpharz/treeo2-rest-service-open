import { Pool } from 'pg';

export const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
});
