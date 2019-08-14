import jwt from 'jsonwebtoken';
import Response from '../helpers/responseHelper';

export default ((req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, decoded) => {
    const { user: { is_admin } } = decoded;
    if (!is_admin) {
      return Response(res, 403, 'Unauthorized', { message: 'Only admins can access this section' });
    }
    return next();
  });
});
