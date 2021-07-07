import fetchHelper from '../../helpers/fetchHelper';
import queries from '../../helpers/queries';
import Response from '../../helpers/responseHelper';

export default async (req, res, next) => {
  const trip = await fetchHelper(queries.trips.selectOneTrip, [req.body.trip_id]);
  if (parseInt(trip.available_seats) < parseInt(req.body.number_of_seats)) {
    return Response(res, 422, `Not enough bookable seats, there are ${trip.available_seats} left`, { });
  }
  return next();
};
