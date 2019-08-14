import bcrypt from 'bcrypt';
import dbService from '../services/authDBServices';

class User {
  constructor({
    id, first_name, last_name, email, password, is_admin,
  }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.is_admin = is_admin;
    this.password = password;
  }

  safe() {
    return {
      id: this.id,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      is_admin: this.is_admin,
    };
  }
}

const hashIt = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
async function findUser(email) {
  const user = await dbService.findUser(email);
  return user;
}

async function findUserById(id) {
  const user = await dbService.findUserById(id);
  return user;
}

async function signin(email, password) {
  const obj = await dbService.signin(email, password).then(res => res);
  if (obj) {
    const user = new User(obj);
    return user.safe();
  }
  return null;
}


async function signup(data) {
  const hash = hashIt(data.password);
  data.password = hash;
  const obj = await dbService.signup(data);
  const user = new User(obj);
  return user.safe();
}


async function allAdmins() {
  const admins = await dbService.allAdmins();
  const payload = [];
  await admins.reduce(async (promise, admin) => {
    await promise;
    const obj = new User(admin);
    const formatted = await obj.safe();
    payload.push(formatted);
  }, Promise.resolve());
  return payload;
}

async function createAdmin(data) {
  const admin = await dbService.createAdmin(data);
  const newAdmin = new User(admin);
  return newAdmin.safe();
}
module.exports = {
  signin, signup, findUser, findUserById, allAdmins, createAdmin,
};
