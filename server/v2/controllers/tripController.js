import tripModel from '../models/tripsModel';
import Response from '../helpers/responseHelper';
import fetchHelper from '../helpers/fetchHelper';
import queries from '../helpers/queries';

async function createTrip(req, res) {
  const trip = await tripModel.create(req);
  if (trip) return Response(res, 201, 'Trip successfully created', trip);
  return Response(res, 500, { error: 'Internal Server Error' }, { });
}

async function allTrips(req, res) {
  const trips = await tripModel.all();
  return Response(res, 200, 'success', trips);
}

async function getTrip(id, res) {
  const trip = await fetchHelper(queries.trips.selectOneTrip, [id]);
  if (trip) return Response(res, 200, `${trip.origin} to ${trip.destination}`, trip);
  return Response(res, 404, 'Trip not found', { });
}
async function cancelTrip(id, res) {
  const trip = await fetchHelper(queries.trips.selectOneTrip, [id]);
  if (!trip) return Response(res, 400, 'Trip does not exist', { });
  if (!trip.status) return Response(res, 409, 'Trip already cancelled', { });
  const { status } = await tripModel.cancel(trip);
  if (status !== 'error') return Response(res, 200, 'Trip cancelled successfully', { });

  return Response(res, 500, 'Something went wrong on the server', { });
}
module.exports = {
  createTrip, allTrips, cancelTrip, getTrip,
};
