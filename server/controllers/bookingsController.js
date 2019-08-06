import bookingsModel from '../models/bookingsModel';
import bookingsValidations from '../validations/bookingValidations';

const allBookings = (req, res) => {
  const bookings = bookingsModel.allBookings();
  return res.status(200).json({
    status: 'success',
    data: bookings,
  });
};

const userBookings = (id, res) => {
  const bookings = bookingsModel.userBookings(id);
  return res.status(200).json({
    status: 'success',
    data: bookings,
  });
};

const createBooking = (req, res) => {
  const { body } = req;
  const { error } = bookingsValidations.validateBooking(body);
  const { trip, user } = bookingsValidations.validateRelationships(body);
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
  if (error) {
    return res.status(400).json({
      status: 'Bad Request',
      data: { message: error.details[0].message },
    });
  }
  const booking = bookingsModel.createBooking(body);
  return res.status(201).json({
    status: 'success',
    data: { ...booking },
  });
};
const deleteBooking = (req, res) => {
  const { id } = req.params;
  const booking = bookingsModel.findBooking(id);
  const { status, details } = bookingsModel.deleteBooking(booking);
  return res.status((status === 'error' ? 500 : 200)).json({
    status,
    data: { message: details },
  });
};
module.exports = {
  allBookings, userBookings, createBooking, deleteBooking,
};
