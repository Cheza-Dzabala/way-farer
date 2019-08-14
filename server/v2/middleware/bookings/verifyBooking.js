import Response from '../../helpers/responseHelper';
import fetchhelper from '../../helpers/fetchHelper';
import queries from '../../helpers/queries';

export default async (req, res, next) => {
  const { id } = req.params;
  const booking = await fetchhelper(queries.bookings.selectOneBookings, [id]);
  if (!booking) return Response(res, 404, 'unsuccessful', { message: 'Booking already deleted' });
  return next();
};
