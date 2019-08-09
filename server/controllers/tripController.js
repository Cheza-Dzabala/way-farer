import tripModel from '../models/tripsModel';
import tripValidation from '../validations/tripValidations';

const createTrip = (req, res) => {
  const { error } = tripValidation.validateNewTrip(req);
  if (error) {
    return res.status(400).json({
      status: 'unsuccessful',
      data: { message: error.details[0].message },
    });
  }

  const busses = tripModel.findBus(req.bus_license_number);

  let len = 0;
  if (busses.length !== 0) {
    while (len <= busses.length) {
      if (busses[len] !== undefined) {
        if (busses[len].trip_date === req.trip_date) {
          return res.status(209).json({
            status: 'unsuccessful',
            data: { message: 'Trip already scheduled on this date' },
          });
        }
      }
      len += 1;
    }
  }

  const trip = tripModel.create(req);
  if (trip) {
    return res.status(201).json({
      status: 'success',
      data: { ...trip },
    });
  }
  return res.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
};

const allTrips = (req, res) => {
  const trips = tripModel.all();
  return res.status(200).json({
    status: 'success',
    data: trips,
  });
};

const getTrip = (id, res) => {
  const trip = tripModel.findTrip(id);
  if (trip) {
    return res.status(200).json({
      status: 'success',
      data: trip,
    });
  }

  return res.status(404).json({
    status: 'unsuccessful',
    data: { message: 'Trip not found' },
  });
};
const cancelTrip = (id, res) => {
  const trip = tripModel.findTrip(id);
  if (!trip) {
    return res.status(400).json({
      status: 'unsuccessful',
      data: {
        message: 'Trip does not exist',
      },
    });
  }
  if (!trip.status) {
    return res.status(409).json({
      status: 'unsuccessful',
      data: {
        message: 'Trip already cancelled',
      },
    });
  }
  const { status, details } = tripModel.cancel(trip);
  if (status !== 'error') {
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Trip cancelled successfully',
      },
    }).end();
  }
  return res.status(500).json({
    status: 'error',
    data: {
      message: `Unable to complete request. Error (${details})`,
    },
  }).end();
};
module.exports = {
  createTrip, allTrips, cancelTrip, getTrip,
};
