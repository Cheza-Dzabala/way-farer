import bookingsModel from '../../models/bookingsModel';
import Response from '../responseHelper';

export default (req, res, next) => {
  const { body } = req;
  let flag = false;
  const bookings = bookingsModel.allBookings();
  bookings.forEach((booking) => {
    if (booking.allocated_seat === body.seat_number) {
      flag = true;
    }
  });
  if (flag === true) return Response(res, 409, 'unsuccessful', { message: 'This seat is unavailable' });

  return next();
};
