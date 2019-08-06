import jwt from 'jsonwebtoken';

const signNewToken = (user, res, status) => jwt.sign({ user }, 'noonewilleverguessthiskey', { expiresIn: '1d' }, (err, token) => res.status(status).json({
  status: 'success',
  data: { ...user, token },
  // ... Splice out the user data from the user object and attach the token to the data object
}));

const setToken = (req, res, next) => {
  const { token } = req.headers;
  // Check if bearer is undefined
  if (typeof (token) !== 'undefined') {
    // Split at the space and generate an array
    const bearer = token.split(' ');

    // Get the token from the new bearer token array
    const bearerToken = bearer[1];

    // Set the token
    req.token = bearerToken;
    next();
  } else {
    return res.status(401).json({
      status: 'unauthorized',
      data: {
        message: 'No token present in the request header',
      },
    });
  }
};

const verifyToken = (req, res, next) => {
  jwt.verify(req.token, 'noonewilleverguessthiskey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ status: 'Invalid Token', data: { message: 'Could not verify the token, please log in again' } });
    }
    next();
  });
};

module.exports = {
  setToken, signNewToken, verifyToken,
};
