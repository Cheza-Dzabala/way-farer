import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';

export default ((req, res, next) => {
  jwt.verify(req.token, 'noonewilleverguessthiskey', (err, decoded) => {
    const { user: { id } } = decoded;
    const user = userModel.findUserById(id);
    if (user.is_admin === false) {
      return res.status(403).json({
        status: 'Unauthorized',
        data: {
          message: 'Only admins can access this section',
        },
      });
    }
    return next();
  });
});
