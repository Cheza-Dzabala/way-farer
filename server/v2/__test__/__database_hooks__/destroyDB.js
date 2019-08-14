import query from '../../services/pool';


export default async function dropTables() {
  const dropTable = 'DROP TABLE IF EXISTS bookings, trips, users';
  await query(dropTable);
}
