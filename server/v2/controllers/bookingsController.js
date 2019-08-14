import bookingsModel from '../models/bookingsModel';
import typeCheck from '../middleware/userTypeMiddleware';
import Response from '../helpers/responseHelper';

async function getBookings(req, res) {
  const userId = typeCheck.verifyUser(req);
  if (userId) return Response(res, 200, 'success', await bookingsModel.userBookings(userId));
  return Response(res, 200, 'success', await bookingsModel.allBookings());
}


async function createBooking(req, res) {
  const { body } = req;
  const booking = await bookingsModel.createBooking(body);
  return Response(res, 201, 'success', booking);
}

async function deleteBooking(req, res) {
  const { id } = req.params;
  const booking = await bookingsModel.findBooking(id);
  if (booking) {
    const { status, details } = await bookingsModel.deleteBooking(booking.id);
    return Response(res, (status === 'error' ? 500 : 200), status, { message: details });
  }
  return Response(res, 4040, 'unsuccessful', { message: 'Booking doesn\'t exist on the system' });
}
module.exports = {
  getBookings, createBooking, deleteBooking,
};
