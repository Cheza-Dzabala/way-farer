import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV } = process.env;
const config = {
  user: process.env.PGUSER, // this is the db user credential
  database: (NODE_ENV === 'test' ? process.env.PG_TEST_DATABASE : process.env.PGDB),
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: process.env.PGMAX, // max number of clients in the pool
  idleTimeoutMillis: process.env.PGTIMEOUT,
};
module.exports = config;
