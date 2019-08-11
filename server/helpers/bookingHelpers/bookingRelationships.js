
import userModel from '../../models/userModel';
import tripsModel from '../../models/tripsModel';
import typeCheck from '../../middleware/userTypeMiddleware';
import Response from '../responseHelper';

export default (req, res, next) => {
  const authenticated = typeCheck.getUser(req);
  const user = userModel.findUserById(authenticated.id);
  const trip = tripsModel.findTrip(req.body.trip_id);
  if (!user) return Response(res, 400, 'unsuccessful', { message: 'No user found with this ID' });
  if (!trip) return Response(res, 400, 'unsuccessful', { message: 'No trip found with this ID' });
  req.body.user_id = user.id;
  return next();
};
