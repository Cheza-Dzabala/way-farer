import Joi from '@hapi/joi';

const validateNewTrip = (data) => {
  const schema = Joi.object().keys({
    origin: Joi.string().trim().regex(/^[a-zA-Z]{3,15}$/).required(),
    destination: Joi.string().trim().regex(/^[a-zA-Z]{3,15}$/).required(),
    fare: Joi.string().trim().regex(/^[0-9]+$/).required(),
    seating_capacity: Joi.number().integer().positive().max(100)
      .required(),
    trip_date: Joi.date().min('now').required(),
    bus_license_number: Joi.string().required(),
  });

  return Joi.validate(data, schema);
};

module.exports = {
  validateNewTrip,
};
