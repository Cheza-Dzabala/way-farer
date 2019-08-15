import bcrypt from 'bcrypt';
import query from './pool';
import queries from '../helpers/queries';

const hashIt = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);


const tables = [
  queries.createTables.tripsTable,
  queries.createTables.usersTable,
  queries.createTables.bookingsTable,
];

async function createAdmin() {
  const queryText = queries.admins.insertAdmin;
  const values = ['Macheza', 'Dzabala', 'dzabalamacheza@gmail.com', hashIt('Runfree8418'), true];
  await query(queryText, values);
}

async function createTrip() {
  const queryText = queries.trips.insertTrip;
  const values = [true, 'Mulanje', 'Kampala', '50000', '50', '10-10-2019', 'BT 2293'];
  await query(queryText, values);
}

export default async function createTables() {
  await tables.reduce(async (promise, table) => {
    await promise;
    await query(table);
  }, Promise.resolve());

  await createAdmin();
  await createTrip();
}

// export pool and createTables to be accessible  from an where within the application
module.exports = {
  createTables,
};
require('make-runnable');
