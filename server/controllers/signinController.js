import authenticationCheck from '../middleware/authenticationCheck';
import UserModel from '../models/userModel';
import authValidation from '../validations/authValidations';

const signin = (req, res) => {
  const { error } = authValidation.vailidateSignin(req);
  if (error) {
    return res.status(400).json({
      status: 'unsuccessful',
      data: {
        message: error.details[0].message,
      },
    });
  }
  const { email, password } = req;
  const user = UserModel.signin(email, password);
  if (user) {
    return authenticationCheck.signNewToken(user, res, 200);
  }
  return res.status(404).json({
    status: 'unsuccessful',
    data: {
      message: 'Invalid Credentials',
    },
  });
};

module.exports = {
  signin,
};
