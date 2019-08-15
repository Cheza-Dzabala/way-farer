import authenticationCheck from '../middleware/authenticationCheck';
import userModel from '../models/userModel';

async function signup(req, res) {
  const user = await userModel.signup(req);
  return authenticationCheck.signNewToken(user.id, res, 201);
}

module.exports = {
  signup,
};
