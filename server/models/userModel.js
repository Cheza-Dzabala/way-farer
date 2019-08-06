import bcrypt from 'bcrypt';
import users from '../data/users';

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
const signin = (email, password) => {
  const obj = users.find(u => u.email === email && bcrypt.compareSync(password, u.password));
  if (obj) {
    const user = new User(obj);
    return user.safe();
  }
  return null;
};



module.exports = {
  signin
};
