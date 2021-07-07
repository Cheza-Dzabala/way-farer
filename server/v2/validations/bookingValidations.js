import Joi from '@hapi/joi';
import userModel from '../models/userModel';
import tripsModel from '../models/tripsModel';

const validateBooking = (data) => {
  const schema = Joi.object().keys({
    trip_id: Joi.number().required(),
    number_of_seats: Joi.string().regex(/^[0-9]+$/).required(),
  });

  return Joi.validate(data, schema);
};

const validateRelationships = (data, userObj) => {
  const user = userModel.findUserById(userObj.id);
  const trip = tripsModel.findTrip(data.trip_id);

  return { user, trip };
};

module.exports = {
  validateBooking, validateRelationships,
};
