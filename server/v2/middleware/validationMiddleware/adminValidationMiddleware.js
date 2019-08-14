import adminValidations from '../../validations/authValidations';
import Response from '../../helpers/responseHelper';

export default (req, res, next) => {
  const { error } = adminValidations.validateSignup(req.body);
  if (error) Response(res, 400, 'unsuccessful', { message: error.details[0].message });
  return next();
};
