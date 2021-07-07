import fetchHelper from '../helpers/fetchHelper';
import queries from '../helpers/queries';
import dbService from '../services/bookingsServices';

class Bookings {
  constructor({
    id, trip_id, user_id, created_on, number_of_seats,
  }) {
    this.id = id;
    this.trip_id = trip_id;
    this.user_id = user_id;
    this.created_on = created_on;
    this.number_of_seats = number_of_seats;
  }


  async bookingModel() {
    const user = await fetchHelper(queries.users.selectById, [this.user_id]);
    const trip = await fetchHelper(queries.trips.selectOneTrip, [this.trip_id]);
    await fetchHelper(queries.trips.modifySeats, [(trip.available_seats - parseInt(this.number_of_seats)), trip.id]);
    return {
      booking_id: this.id,
      trip_id: trip.id,
      allocated_seats: parseInt(this.number_of_seats),
      bus_license_number: trip.bus_license_number,
      trip_date: trip.trip_date,
      first_name: user.first_name,
      last_name: user.last_name,
      user_email: user.email,
    };
  }
}


async function allBookings() {
  const bookings = await dbService.all();
  const payload = [];
  await bookings.reduce(async (promise, booking) => {
    await promise;
    const obj = new Bookings(booking);
    const formatted = await obj.bookingModel();
    payload.push(formatted);
  }, Promise.resolve());
  return payload;
}

async function userBookings(id) {
  let bookings = false;
  const payload = [];
  const user = await fetchHelper(queries.users.selectById, [id]);
  if (user) {
    bookings = await dbService.userBookings(id);
    await bookings.reduce(async (promise, booking) => {
      await promise;
      const obj = new Bookings(booking);
      const formatted = await obj.bookingModel();
      payload.push(formatted);
    }, Promise.resolve());
  }
  return payload;
}

async function createBooking(data) {
  console.log(data);
  const obj = await dbService.create(data);
  const booking = new Bookings(obj);
  const payload = await booking.bookingModel();
  return payload;
}

async function deleteBooking(booking) {
  try {
    await dbService.deleteBooking(booking.id);
    const trip = await fetchHelper(queries.trips.selectOneTrip, [booking.trip_id]);
    await fetchHelper(queries.trips.modifySeats, [(parseInt(trip.available_seats) + parseInt(booking.number_of_seats)), trip.id]);
    return {
      status: 'success',
      details: 'Successfully deleted booking',
    };
  } catch (err) {
    return {
      status: 'error',
      details: err.message,
    };
  }
}
module.exports = {
  allBookings, userBookings, createBooking, deleteBooking,
};
