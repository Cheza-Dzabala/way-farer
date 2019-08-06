import Joi from '@hapi/joi';

const validateNewTrip = (data) => {
  const schema = Joi.object().keys({
    origin: Joi.string().trim().regex(/^[a-zA-Z]{3,15}$/).required(),
    destination: Joi.string().trim().regex(/^[a-zA-Z]{3,15}$/).required(),
    fare: Joi.number().min(1000).max(20000).required(),
    seating_capacity: Joi.number().min(10).max(50).required(),
    trip_date: Joi.date().min('now').required(),
    bus_license_number: Joi.string().required(),
  });

  return Joi.validate(data, schema);
};

module.exports = {
  validateNewTrip,
};
