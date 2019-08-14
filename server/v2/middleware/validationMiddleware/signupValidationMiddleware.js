import userModel from '../../models/userModel';
import authValidations from '../../validations/authValidations';
import Response from '../../helpers/responseHelper';

export default async (req, res, next) => {
  const doesExist = await userModel.findUser(req.body.email);
  const { error } = authValidations.validateSignup(req.body);
  if (doesExist !== 0) return Response(res, 409, 'unsuccessful', { message: 'Email already exists on the system' });
  if (error) return Response(res, 400, 'unsuccessful', { message: error.details[0].message });
  return next();
};
