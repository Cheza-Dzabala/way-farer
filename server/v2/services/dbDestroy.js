import query from './pool';


const usersTable = 'DROP TABLE IF EXISTS users CASCADE';

const tripsTable = 'DROP TABLE IF EXISTS trips CASCADE';


const bookingsTable = 'DROP TABLE IF EXISTS bookings CASCADE';

const tables = [
  tripsTable, usersTable, bookingsTable,
];

async function dropTables() {
  await tables.reduce(async (promise, table) => {
    await promise;
    await query(table);
  }, Promise.resolve());
}


// export pool and createTables to be accessible  from an where within the application
module.exports = {
  dropTables,
};
require('make-runnable');
