
import typeCheck from '../userTypeMiddleware';
import Response from '../../helpers/responseHelper';
import fetchHelper from '../../helpers/fetchHelper';
import queries from '../../helpers/queries';

export default async (req, res, next) => {
  const { body: { trip_id } } = req;
  const authenticated = typeCheck.getUser(req);
  const user = await fetchHelper(queries.users.selectById, [authenticated]);
  const trip = await fetchHelper(queries.trips.selectOneTrip, [trip_id]);
  if (!user) return Response(res, 400, 'unsuccessful', { message: 'No user found with this ID' });
  if (!trip) return Response(res, 400, 'unsuccessful', { message: 'No trip found with this ID' });
  if (!trip.status) return Response(res, 400, 'unsuccessful', { message: 'Cannot book this trip. Trip cancelled' });
  req.body.user_id = user.id;
  req.body.trip_id = trip.id;
  req.body.email = user.email;
  return next();
};
