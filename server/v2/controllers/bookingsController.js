import bookingsModel from '../models/bookingsModel';
import typeCheck from '../middleware/userTypeMiddleware';
import Response from '../helpers/responseHelper';
import queries from '../helpers/queries';
import fetchHelper from '../helpers/fetchHelper';

async function getBookings(req, res) {
  const user = await typeCheck.verifyUser(req);
  if (!user.is_admin) return Response(res, 200, 'success', await bookingsModel.userBookings(user.id));
  return Response(res, 200, 'success', await bookingsModel.allBookings());
}


async function createBooking(req, res) {
  const { body } = req;
  const booking = await bookingsModel.createBooking(body);
  return Response(res, 201, 'success', booking);
}

async function deleteBooking(req, res) {
  const { id } = req.params;
  const booking = await fetchHelper(queries.bookings.selectOneBookings, [id]);
  if (booking) {
    const { status, details } = await bookingsModel.deleteBooking(booking.id);
    return Response(res, (status === 'error' ? 500 : 200), status, { message: details });
  }
  return Response(res, 4040, 'unsuccessful', { message: 'Booking doesn\'t exist on the system' });
}
module.exports = {
  getBookings, createBooking, deleteBooking,
};
