import query from './pool';
import queries from '../helpers/queries';

async function create({
  origin, destination, fare, seating_capacity, trip_date, bus_license_number,
}) {
  const queryText = queries.trips.insertTrip;
  const values = [true, origin, destination, fare, seating_capacity, trip_date, bus_license_number];
  try {
    const { rows } = await query(queryText, values);
    return rows[0];
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


async function all() {
  const queryText = queries.trips.selectAllTripsForUsers;
  const values = [false];
  try {
    const { rows } = await query(queryText, values);
    return rows;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


async function findBusses(bus_license_number) {
  const queryText = queries.trips.selectBusses;
  const values = [bus_license_number];
  try {
    const { rows } = await query(queryText, values);
    return rows;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}

async function cancel(id) {
  const queryText = queries.trips.updateTrip;
  const values = [false, id];
  try {
    const { rows } = await query(queryText, values);
    return rows;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


module.exports = {
  create, findBusses, cancel, all,
};
