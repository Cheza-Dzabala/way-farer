import dotenv from 'dotenv';

dotenv.config();


const { NODE_ENV } = process.env;
let user;
let database;
let password;
let port;
let url;
let max;
let idleTimeoutMillis;

if (NODE_ENV === 'production') {
  user = process.env.HEROKU_USER;
  database = process.env.HEROKU_DB;
  password = process.env.HEROKU_PASSWORD;
  port = process.env.HEROKU_PORT;
  url = process.env.HEROKU_URI;
} else if (NODE_ENV === 'test' || NODE_ENV === 'dev') {
  user = process.env.PGUSER; // this is the db user credential
  database = (NODE_ENV === 'test' ? process.env.PG_TEST_DATABASE : process.env.PGDB);
  password = process.env.PGPASSWORD;
  port = process.env.PGPORT;
  max = process.env.PGMAX; // max number of clients in the pool
  idleTimeoutMillis = process.env.PGTIMEOUT;
}

const config = {
  user,
  password,
  database,
  port,
  url,
};

module.exports = config;
