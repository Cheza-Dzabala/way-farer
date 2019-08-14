import tripsModel from './tripsModel';
import usersModel from './userModel';
import dbService from '../services/bookingsServices';

class Bookings {
  constructor({
    id, trip_id, user_id, created_on, seat_number,
  }) {
    this.id = id;
    this.trip_id = trip_id;
    this.user_id = user_id;
    this.created_on = created_on;
    this.seat_number = seat_number;
  }

  async bookingModel() {
    const user = await usersModel.findUserById(this.user_id);
    const trip = await tripsModel.findTrip(this.trip_id);
    return {
      booking_id: this.id,
      trip_id: trip.id,
      allocated_seat: this.seat_number,
      bus_license_number: trip.bus_license_number,
      trip_date: trip.trip_date,
      first_name: user.first_name,
      last_name: user.last_name,
      user_email: user.email,
    };
  }
}

async function findBooking(id) {
  const booking = await dbService.findBooking(id);
  return booking;
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
  const user = await usersModel.findUserById(id);
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
  const obj = await dbService.create(data);
  const booking = new Bookings(obj);
  const payload = await booking.bookingModel();
  return payload;
}

async function deleteBooking(booking) {
  try {
    await dbService.deleteBooking(booking);
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
  allBookings, userBookings, createBooking, findBooking, deleteBooking,
};
