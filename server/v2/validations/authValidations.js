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
    password: Joi.string().trim().regex(/[0-9]$/).regex(/^[A-Za-z][A-Za-z0-9]*$/)
      .required(),
    first_name: Joi.string().trim().regex(/^[a-zA-Z]{3,10}$/).required(),
    last_name: Joi.string().trim().regex(/^[a-zA-Z]{3,10}$/).required(),
  });

  return Joi.validate(data, schema);
};

module.exports = {
  vailidateSignin, validateSignup,
};
