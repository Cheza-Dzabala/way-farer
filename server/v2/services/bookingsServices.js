import query from './pool';
import queries from '../helpers/queries';
import Response from '../helpers/responseHelper';

async function create({
  trip_id, user_id, number_of_seats,
}) {
  const queryText = queries.bookings.insertBooking;
  const values = [trip_id, user_id, number_of_seats, Date.now()];
  try {
    const { rows } = await query(queryText, values);
    return rows[0];
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


async function all() {
  const queryText = queries.bookings.selectAllBookings;
  try {
    const { rows } = await query(queryText);
    return rows;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}

async function userBookings(id) {
  const queryText = queries.bookings.selectWhereBookings;
  const values = [id];
  try {
    const { rows } = await query(queryText, values);
    return rows;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}

async function deleteBooking(id) {
  const queryText = queries.bookings.deleteFromBookingsWhere;
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
  const queryText = queries.bookings.insertBooking;
  const values = [first_name, last_name, email, password, true];
  try {
    const { rows } = await query(queryText, values);
    return rows[0];
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


module.exports = {
  create, userBookings, deleteBooking, all, createAdmin,
};
