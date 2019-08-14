import tripModel from '../../models/tripsModel';
import Response from '../../helpers/responseHelper';

export default async (req, res, next) => {
  const { body } = req;
  const busses = await tripModel.findBus(body.bus_license_number);
  let len = 0;
  if (busses.length > 0) {
    while (len < busses.length) {
      if (busses[len] !== undefined) {
        if (busses[len].trip_date === body.trip_date) {
          return Response(res, 209, 'unsuccessful', { message: 'This bus is already booked on a trip on this date' });
        }
      }
      len += 1;
    }
  }

  return next();
};
