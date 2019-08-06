import Joi from '@hapi/joi';

const validateNewTrip = (data) => {
  const schema = Joi.object().keys({
    origin: Joi.string().trim().required(),
    destination: Joi.string().trim().required(),
    fare: Joi.number().required(),
    seating_capacity: Joi.number().required(),
    trip_date: Joi.date().min('now').required(),
    bus_license_number: Joi.string().required(),
  });

  return Joi.validate(data, schema);
};

module.exports = {
  validateNewTrip,
};
