import authenticationCheck from '../middleware/authenticationCheck';
import UserModel from '../models/userModel';

import Response from '../helpers/responseHelper';

const signin = (body, res) => {
  const { email, password } = body;
  const user = UserModel.signin(email, password);
  if (user) {
    return authenticationCheck.signNewToken(user, res, 200);
  }
  return Response(res, 404, 'unsuccessful', { message: 'Invalid Credentials' });
};

module.exports = {
  signin,
};
