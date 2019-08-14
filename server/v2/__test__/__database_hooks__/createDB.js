import bcrypt from 'bcrypt';
import query from '../../services/pool';

const hashIt = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

const usersTable = `CREATE TABLE IF NOT EXISTS
              users(
              id SERIAL PRIMARY KEY,
              first_name VARCHAR(128) NOT NULL,
              last_name VARCHAR(128) NOT NULL,
              email VARCHAR(128) NOT NULL,
              password VARCHAR(128) NOT NULL,
              is_admin BOOLEAN DEFAULT 'f'
            )`;

const tripsTable = `CREATE TABLE IF NOT EXISTS
              trips(
              id SERIAL PRIMARY KEY,
              bus_license_number VARCHAR(128) NOT NULL,
              origin VARCHAR(128) NOT NULL,
              destination VARCHAR(128) NOT NULL,
              fare FLOAT(2) NOT NULL,
              seating_capacity INTEGER NOT NULL,
              trip_date VARCHAR(128) NOT NULL,
              status BOOLEAN DEFAULT 'true'
            )`;


const bookingsTable = `CREATE TABLE IF NOT EXISTS
              bookings(
              id SERIAL,
              trip_id  INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
              user_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              seat_number  VARCHAR (128) NOT NULL,
              created_on VARCHAR (128) NOT NULL,
              PRIMARY KEY(trip_id, user_id)
            )`;

const tables = [
  tripsTable, usersTable, bookingsTable,
];

async function createAdmin() {
  const queryText = 'INSERT INTO users(first_name, last_name, email, password, is_admin) VALUES($1, $2, $3, $4, $5) RETURNING *';
  const values = ['Macheza', 'Dzabala', 'dzabalamacheza@gmail.com', hashIt('Runfree8418_!*'), true];
  query(queryText, values);
}


export default async function createTables() {
  await tables.reduce(async (promise, table) => {
    await promise;
    await query(table);
  }, Promise.resolve());

  await createAdmin();
}
