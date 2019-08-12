/* eslint-disable camelcase */
import tripModel from '../models/tripsModel';
import Response from '../helpers/responseHelper';

const createTrip = (req, res) => {
  const trip = tripModel.create(req);
  if (trip) return Response(res, 201, 'success', trip);
  return Response(res, 500, 'error', { message: 'Internal Server Error' });
};

const allTrips = (req, res) => {
  const trips = tripModel.all();
  return Response(res, 200, 'success', trips);
};

const getTrip = (id, res) => {
  const trip = tripModel.findTrip(id);
  if (trip) return Response(res, 200, 'success', trip);
  return Response(res, 404, 'unsuccessful', { message: 'Trip not found' });
};
const cancelTrip = (id, res) => {
  const trip = tripModel.findTrip(id);
  if (!trip) return Response(res, 400, 'unsuccessful', { message: 'Trip does not exist' });
  if (!trip.status) return Response(res, 409, 'unsuccessful', { message: 'Trip already cancelled' });

  const { status } = tripModel.cancel(trip);
  if (status !== 'error') return Response(res, 200, 'success', { message: 'Trip cancelled successfully' });

  return Response(res, 500, 'unsuccessful', { message: 'something went wrong on the server' });
};
module.exports = {
  createTrip, allTrips, cancelTrip, getTrip,
};
