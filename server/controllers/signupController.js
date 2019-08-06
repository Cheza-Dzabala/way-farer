import authenticationCheck from '../middleware/authenticationCheck';
import userModel from '../models/userModel';
import authValidations from '../validations/authValidations';

const signup = (req, res) => {
  const doesExist = userModel.findUser(req.email);
  const { error } = authValidations.validateSignup(req);


  if (doesExist) {
    // 409 - Conflict
    return res.status(409).json({
      status: 'Forbidden',
      data: {
        message: 'Email already exists on the system',
      },
    });
  }
  if (error) {
    return res.status(400).json({
      status: 'Bad Request',
      data: {
        message: error.details[0].message,
      },
    });
  }

  const user = userModel.signup(req);
  return authenticationCheck.signNewToken(user, res, 201);
};

module.exports = {
  signup,
};
