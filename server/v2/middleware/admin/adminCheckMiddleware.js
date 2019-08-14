import jwt from 'jsonwebtoken';
import Response from '../../helpers/responseHelper';
import fetchHelper from '../../helpers/fetchHelper';
import queries from '../../helpers/queries';

const verify = (token) => {
  let userId = null;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    const { user } = decoded;
    userId = user;
  });
  return userId;
};
export default async function (req, res, next) {
  const { token } = req;
  const userId = verify(token);
  const userObject = await fetchHelper(queries.users.selectById, [userId]);
  // console.log(userObject);
  if (!userObject.is_admin) {
    return Response(res, 403, 'Unauthorized', { message: 'Only admins can access this section' });
  }
  return next();
}
