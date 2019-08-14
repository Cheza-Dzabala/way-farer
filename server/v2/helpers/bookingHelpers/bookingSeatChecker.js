import bookingsModel from '../../models/bookingsModel';
import Response from '../responseHelper';

export default async (req, res, next) => {
  const { body } = req;
  let flag = false;

  const bookings = await bookingsModel.allBookings();
  bookings.forEach((booking) => {
    if (booking.allocated_seat === body.seat_number && booking.trip_id === body.trip_id) {
      flag = { status: true, message: 'This seat is unavailable' };
    } else if (booking.user_email === body.email && booking.trip_id === body.trip_id) {
      flag = { status: true, message: 'You\'ve already made a booking on this bus' };
    }
  });
  if (flag.status === true) return Response(res, 409, 'unsuccessful', { message: flag.message });

  return next();
};
