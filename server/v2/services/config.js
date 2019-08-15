import dotenv from 'dotenv';

dotenv.config();


const { NODE_ENV } = process.env;
let user;
let database;
let password;
let port;
let url;
let host;

if (NODE_ENV === 'production') {
  user = process.env.HEROKU_USER;
  database = process.env.HEROKU_DB;
  password = process.env.HEROKU_PASSWORD;
  port = process.env.HEROKU_PORT;
  url = process.env.HEROKU_URI;
  host = process.env.HEROKU_HOST;
} else if (NODE_ENV === 'test' || NODE_ENV === 'dev') {
  host = process.env.HOST;
  user = process.env.PGUSER; // this is the db user credential
  database = (NODE_ENV === 'test' ? process.env.PG_TEST_DATABASE : process.env.PGDB);
  password = process.env.PGPASSWORD;
  port = process.env.PGPORT;
}

const config = {
  host,
  user,
  password,
  database,
  port,
  url,
};

console.log(config);
module.exports = config;
