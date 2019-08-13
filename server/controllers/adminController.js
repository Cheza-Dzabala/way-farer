import userModel from '../models/userModel';
import Response from '../helpers/responseHelper';

const allAdmins = (res) => {
  const admins = userModel.allAdmins();
  return Response(res, 200, 'success', admins);
};

const create = ({ body }, res) => {
  const admin = userModel.createAdmin(body);
  if (admin) return Response(res, 201, 'success', admin);
  return Response(res, 500, 'error', 'Something went wrong on the server');
};
module.exports = {
  allAdmins, create,
};
