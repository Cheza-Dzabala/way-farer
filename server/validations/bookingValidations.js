import Joi from '@hapi/joi';
import userModel from '../models/userModel';
import tripsModel from '../models/tripsModel';

const validateBooking = (data) => {
  const schema = Joi.object().keys({
    user_id: Joi.number().required(),
    trip_id: Joi.number().required(),
    seat_number: Joi.string().required(),
  });

  return Joi.validate(data, schema);
};

const validateRelationships = (data) => {
  const user = userModel.findUserById(data.user_id);
  const trip = tripsModel.findTrip(data.trip_id);

  return { user, trip };
};

module.exports = {
  validateBooking, validateRelationships,
};
