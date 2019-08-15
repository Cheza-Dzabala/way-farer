import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV } = process.env;
let db;

if (NODE_ENV === 'test') {
  db = process.env.PG_TEST_DATABASE;
} else if (NODE_ENV === 'dev') {
  db = process.env.PGDB;
} else {
  db = process.env.DATABASE_URL;
}

const config = {
  user: process.env.PGUSER, // this is the db user credential
  database: db,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: process.env.PGMAX, // max number of clients in the pool
  idleTimeoutMillis: process.env.PGTIMEOUT,
};
module.exports = config;
