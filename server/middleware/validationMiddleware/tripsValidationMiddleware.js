import tripValidation from '../../validations/tripValidations';
import Response from '../../helpers/responseHelper';

export default (req, res, next) => {
  const { body } = req;
  const { error } = tripValidation.validateNewTrip(body);
  if (error) return Response(res, 400, 'unsuccessful', { message: error.details[0].message });

  return next();
};
