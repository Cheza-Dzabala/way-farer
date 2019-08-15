import queries from '../../helpers/queries';
import typeCheck from '../userTypeMiddleware';
import Response from '../../helpers/responseHelper';
import fetchHelper from '../../helpers/fetchHelper';

export default async (req, res, next) => {
  const { id } = req.params;
  const authenticated = typeCheck.getUser(req);
  const user = await fetchHelper(queries.users.selectById, [authenticated]);
  const booking = await fetchHelper(queries.bookings.selectOneBookings, [id]);
  if (!user) return Response(res, 404, 'No user found with this ID', { });
  if (!booking) return Response(res, 404, 'No booking found with this ID', { });
  if (booking.user_id !== authenticated && user.is_admin !== true) {
    return Response(res, 403, 'Not permitted to delete bookings other than yours', {});
  }
  return next();
};
