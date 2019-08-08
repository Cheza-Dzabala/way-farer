/* eslint-disable dot-notation */
import jwt from 'jsonwebtoken';

const getUser = (req) => {
  const { token } = req.headers;
  const bearer = token.split(' ');
  // Get the token from the new bearer token array
  const bearerToken = bearer[1];
  const { user } = jwt.decode(bearerToken, process.env.SECRET_KEY);
  return user;
};

const verifyUser = (req) => {
  const user = getUser(req);
  if (user.is_admin === false) {
    return user.id;
  }

  return null;
};

module.exports = {
  verifyUser, getUser,
};
