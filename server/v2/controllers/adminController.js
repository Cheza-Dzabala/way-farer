import userModel from '../models/userModel';
import Response from '../helpers/responseHelper';

async function allAdmins(res) {
  const admins = await userModel.allAdmins();
  return Response(res, 200, 'success', admins);
}

async function create({ body }, res) {
  const admin = await userModel.createAdmin(body);
  if (admin) return Response(res, 201, 'success', admin);
  return Response(res, 500, 'error', 'Something went wrong on the server');
}
module.exports = {
  allAdmins, create,
};
