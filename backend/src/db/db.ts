import pg from 'pg'
import { db } from "./config.js";

export const pool = new pg.Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port as number,
  database: db.database,
});

pool.on('connect', () => console.log('Connected to Database!'))