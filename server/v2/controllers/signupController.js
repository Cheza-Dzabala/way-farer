import authenticationCheck from '../middleware/authenticationCheck';
import userModel from '../models/userModel';

async function signup(req, res) {
  const user = await userModel.signup(req);
  return authenticationCheck.signNewToken(user, res, 201);
}

module.exports = {
  signup,
};
