import userModel from '../models/userModel';
import adminValidations from '../validations/authValidations';

const allAdmins = (res) => {
  const admins = userModel.allAdmins();
  return res.status(200).json({
    status: 'success',
    data: admins,
  });
};

const create = ({ body }, res) => {
  const { error } = adminValidations.validateSignup(body);

  if (error) {
    return res.status(400).json({
      status: 'unsuccessful',
      data: { message: error.details[0].message },
    });
  }
  const user = userModel.findUser(body.email);
  if (user) {
    return res.status(409).json({
      status: 'unsuccessful',
      data: {
        message: 'Email already exists on the system',
      },
    });
  }
  const admin = userModel.createAdmin(body);
  if (admin) {
    return res.status(201).json({
      status: 'success',
      data: admin,
    });
  }
  return res.status(500).json({
    status: 'error',
    data: {
      message: 'Something went wrong on the server',
    },
  });
};
module.exports = {
  allAdmins, create,
};
