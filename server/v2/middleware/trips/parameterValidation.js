import Response from '../../helpers/responseHelper';

export default async (req, res, next) => {
  const id = req.param('id');
  if (id > 0) {
    return next();
  }
  return Response(res, 400, 'Invalid character set in parameter', { });
};
