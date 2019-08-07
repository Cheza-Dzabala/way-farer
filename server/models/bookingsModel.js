/* eslint-disable camelcase */
import bookings from '../data/bookings.json';
import tripsModel from './tripsModel';
import usersModel from './userModel';
import helpers from '../helpers/helpers';

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

  bookingModel() {
    const user = usersModel.findUserById(this.user_id);
    const trip = tripsModel.findTrip(this.trip_id);
    return {
      booking_id: this.id,
      allocated_seat: this.seat_number,
      bus_license_number: trip.bus_license_number,
      trip_date: trip.trip_date,
      user_id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      user_email: user.email,
    };
  }
}

const findBooking = id => bookings.find(booking => booking.id === parseInt(id));
const allBookings = () => {
  const bookingsPayload = [];
  bookings.forEach((booking) => {
    bookingsPayload.push(new Bookings(booking).bookingModel());
  });
  return bookingsPayload;
};

const userBookings = (id) => {
  const bookingsArray = [];
  const user = usersModel.findUserById(id);
  if (user) {
    bookings.forEach((booking) => {
      if (booking.user_id === parseInt(id)) {
        bookingsArray.push(new Bookings(booking).bookingModel());
      }
    });
  }
  return bookingsArray;
};

const createBooking = (data, user) => {
  data.id = helpers.generateId(bookings);
  data.created_on = Date.now();
  data.user_id = user.id;
  const booking = new Bookings(data);
  bookings.push(booking);
  return booking.bookingModel();
};

const deleteBooking = (booking) => {
  try {
    const index = bookings.indexOf(booking);
    if (index !== -1) bookings.splice(index, 1);
  } catch (err) {
    return {
      status: 'error',
      details: err.message,
    };
  }
  return {
    status: 'success',
    details: 'Successfully deleted booking',
  };
};
module.exports = {
  allBookings, userBookings, createBooking, findBooking, deleteBooking,
};
