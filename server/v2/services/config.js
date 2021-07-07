import dotenv from 'dotenv';

dotenv.config();


const { NODE_ENV } = process.env;


let config = {
  user: process.env.PGUSER,
  database: (NODE_ENV === 'test' ? process.env.PG_TEST_DATABASE : process.env.PG_DATABASE),
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};
if (NODE_ENV === 'production') {
  config = {
    user: process.env.HEROKU_USER,
    database: process.env.HEROKU_DB,
    password: process.env.HEROKU_PASSWORD,
    port: process.env.HEROKU_PORT,
    url: process.env.HEROKU_URI,
    host: process.env.HEROKU_HOST,
  };
} else if (NODE_ENV === 'test') {
  config = {
    user: process.env.PGUSER,
    database: (NODE_ENV === 'test' ? process.env.PG_TEST_DATABASE : process.env.PG_DATABASE),
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  };
}


module.exports = config;
