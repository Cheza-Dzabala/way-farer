import authValidation from '../../validations/authValidations';
import Response from '../../helpers/responseHelper';

export default (req, res, next) => {
  const { error } = authValidation.vailidateSignin(req.body);
  if (error) return Response(res, 400, error.details[0].message, { });
  return next();
};
