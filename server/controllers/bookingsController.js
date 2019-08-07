/* eslint-disable dot-notation */
import bookingsModel from '../models/bookingsModel';
import bookingsValidations from '../validations/bookingValidations';
import typeCheck from '../middleware/userTypeMiddleware';

const getBookings = (req, res) => {
  const userId = typeCheck.verifyUser(req);
  if (userId) {
    const bookings = bookingsModel.userBookings(userId);
    return res.status(200).json({
      status: 'success',
      data: bookings,
    });
  }

  const bookings = bookingsModel.allBookings();
  return res.status(200).json({
    status: 'success',
    data: bookings,
  });
};


const createBooking = (req, res) => {
  const user = typeCheck.getUser(req);
  const { body } = req;
  const { error } = bookingsValidations.validateBooking(body);
  let flag = false;

  if (error) {
    return res.status(400).json({
      status: 'Bad Request',
      data: { message: error.details[0].message },
    });
  }
  const { trip } = bookingsValidations.validateRelationships(body, user);
  if (!user) {
    return res.status(404).json({
      status: 'User not found',
      data: { message: 'No user found with this ID' },
    });
  } if (!trip) {
    return res.status(404).json({
      status: 'Trip not found',
      data: { message: 'No trip found with this ID' },
    });
  }

  const bookings = bookingsModel.allBookings();
  bookings.forEach((booking) => {
    const { email } = user;
    if (booking.user_email === email && booking.trip_date === trip.trip_date) {
      flag = true;
    }
  });

  if (flag === true) {
    return res.status(409).json({
      status: 'unsuccessful',
      data: { message: 'Booking has already been made' },
    });
  }

  const booking = bookingsModel.createBooking(body, user);
  return res.status(201).json({
    status: 'success',
    data: { ...booking },
  });
};
const deleteBooking = (req, res) => {
  const { id } = req.params;
  const booking = bookingsModel.findBooking(id);
  if (booking) {
    const { status, details } = bookingsModel.deleteBooking(booking);
    return res.status((status === 'error' ? 500 : 200)).json({
      status,
      data: { message: details },
    });
  }
  return res.status(403).json({
    status: 'Forbidden',
    data: { message: 'Booking doesn\'t exist on the system' },
  });
};
module.exports = {
  getBookings, createBooking, deleteBooking,
};
