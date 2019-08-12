/* eslint-disable dot-notation */
import bookingsModel from '../models/bookingsModel';
import typeCheck from '../middleware/userTypeMiddleware';
import Response from '../helpers/responseHelper';

const getBookings = (req, res) => {
  const userId = typeCheck.verifyUser(req);
  if (userId) return Response(res, 200, 'success', bookingsModel.userBookings(userId));
  return Response(res, 200, 'success', bookingsModel.allBookings());
};


const createBooking = (req, res) => {
  const { body } = req;
  const booking = bookingsModel.createBooking(body);
  return Response(res, 201, 'success', booking);
};

const deleteBooking = (req, res) => {
  const { id } = req.params;
  const booking = bookingsModel.findBooking(id);
  if (booking) {
    const { status, details } = bookingsModel.deleteBooking(booking);
    return Response(res, (status === 'error' ? 500 : 200), status, { message: details });
  }
  return Response(res, 4040, 'unsuccessful', { message: 'Booking doesn\'t exist on the system' });
};
module.exports = {
  getBookings, createBooking, deleteBooking,
};
