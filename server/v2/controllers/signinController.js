import authenticationCheck from '../middleware/authenticationCheck';
import UserModel from '../models/userModel';

import Response from '../helpers/responseHelper';

async function signin(body, res) {
  const { email, password } = body;
  const user = await UserModel.signin(email, password);
  if (user) {
    return authenticationCheck.signNewToken(user.id, res, 200);
  }
  return Response(res, 404, 'unsuccessful', { message: 'Invalid Credentials' });
}

module.exports = {
  signin,
};
