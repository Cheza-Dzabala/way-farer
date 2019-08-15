import jwt from 'jsonwebtoken';
import fetchHelper from '../helpers/fetchHelper';
import queries from '../helpers/queries';

const getUser = (req) => {
  const { token } = req.headers;
  const bearer = token.split(' ');
  // Get the token from the new bearer token array
  const bearerToken = bearer[1];
  const { user } = jwt.decode(bearerToken, process.env.SECRET_KEY);
  return user;
};

async function verifyUser(req) {
  const id = getUser(req);
  const user = await fetchHelper(queries.users.selectById, [id]);
  return user;
}

module.exports = {
  verifyUser, getUser,
};
