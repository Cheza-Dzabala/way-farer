import Joi from '@hapi/joi';

const vailidateSignin = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  });

  return Joi.validate(data, schema);
};

const validateSignup = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
    last_name: Joi.string().trim().required(),
    first_name: Joi.string().trim().required(),
  });

  return Joi.validate(data, schema);
};

module.exports = {
  vailidateSignin, validateSignup,
};
