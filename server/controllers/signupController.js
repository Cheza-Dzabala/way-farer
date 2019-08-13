import authenticationCheck from '../middleware/authenticationCheck';
import userModel from '../models/userModel';

const signup = (req, res) => {
  const user = userModel.signup(req);
  return authenticationCheck.signNewToken(user, res, 201);
};

module.exports = {
  signup,
};
