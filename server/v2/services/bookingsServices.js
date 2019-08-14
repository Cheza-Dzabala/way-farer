import query from './pool';


async function create({
  trip_id, user_id, seat_number,
}) {
  const queryText = 'INSERT INTO bookings(trip_id, user_id, seat_number, created_on) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [trip_id, user_id, seat_number, Date.now()];
  try {
    const { rows } = await query(queryText, values);
    return rows[0];
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


async function all() {
  const queryText = 'SELECT * From bookings';
  try {
    const { rows } = await query(queryText);
    return rows;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


async function findBooking(id) {
  const queryText = 'SELECT * From bookings WHERE id = $1';
  const values = [id];
  try {
    const { rows } = await query(queryText, values);
    return rows[0];
  } catch (error) {
    console.log(`Database ${error}`);
  }
}

async function userBookings(id) {
  const queryText = 'SELECT * From bookings WHERE user_id = $1';
  const values = [id];
  try {
    const { rows } = await query(queryText, values);
    return rows;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}

async function deleteBooking(id) {
  const queryText = 'DELETE FROM bookings WHERE id = $1';
  const values = [id];
  try {
    const { rows } = await query(queryText, values);
    return rows;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}

async function createAdmin({
  first_name, last_name, email, password,
}) {
  const queryText = 'INSERT INTO bookings(first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [first_name, last_name, email, password, true];
  try {
    const { rows } = await query(queryText, values);
    return rows[0];
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


module.exports = {
  create, findBooking, userBookings, deleteBooking, all, createAdmin,
};
