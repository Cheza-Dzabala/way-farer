import bookingsModel from '../../models/bookingsModel';
import Response from '../responseHelper';

export default async (req, res, next) => {
  const { id } = req.params;
  const booking = await bookingsModel.findBooking(id);
  if (!booking) return Response(res, 404, 'unsuccessful', { message: 'Booking already deleted' });
  return next();
};
