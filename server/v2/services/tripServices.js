import query from './pool';

async function create({
  origin, destination, fare, seating_capacity, trip_date, bus_license_number,
}) {
  const queryText = 'INSERT INTO trips(status, origin, destination, fare, seating_capacity, trip_date, bus_license_number) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *';
  const values = [true, origin, destination, fare, seating_capacity, trip_date, bus_license_number];
  try {
    const { rows } = await query(queryText, values);
    return rows[0];
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


async function all() {
  const queryText = 'SELECT * From trips WHERE status != $1';
  const values = [false];
  try {
    const { rows } = await query(queryText, values);
    return rows;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


async function find(id) {
  const queryText = 'SELECT * From trips WHERE id = $1';
  const values = [id];
  try {
    const { rows } = await query(queryText, values);
    return rows[0];
  } catch (error) {
    console.log(`Database ${error}`);
  }
}

async function findBusses(bus_license_number) {
  const queryText = 'SELECT * From trips WHERE bus_license_number = $1';
  const values = [bus_license_number];
  try {
    const { rows } = await query(queryText, values);
    return rows;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}

async function cancel(id) {
  const queryText = 'UPDATE trips SET status = $1  WHERE id = $2';
  const values = [false, id];
  try {
    const { rows } = await query(queryText, values);
    return rows;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


module.exports = {
  create, find, findBusses, cancel, all,
};
