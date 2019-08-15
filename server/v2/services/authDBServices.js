import bcrypt from 'bcrypt';
import query from './pool';
import queries from '../helpers/queries';


async function findUser(email) {
  const queryText = queries.users.selectByEmail;
  const values = [email];
  try {
    const { rows } = await query(queryText, values);
    return rows.length;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}

async function signin(email, password) {
  const queryText = queries.users.selectByEmail;
  const values = [email];
  try {
    const { rows } = await query(queryText, values);
    if (bcrypt.compareSync(password, rows[0].password)) {
      return rows[0];
    }
    return null;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


async function signup({
  first_name, last_name, email, password,
}) {
  const queryText = queries.users.insertUser;
  const values = [first_name, last_name, email, password];
  try {
    const { rows } = await query(queryText, values);
    return rows[0];
  } catch (error) {
    console.log(`Database ${error}`);
  }
}

async function createAdmin({
  first_name, last_name, email, password,
}) {
  const queryText = queries.admins.insertAdmin;
  const values = [first_name, last_name, email, password, true];
  try {
    const { rows } = await query(queryText, values);
    return rows[0];
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


async function allAdmins() {
  const queryText = queries.admins.selectAllAdmins;
  const values = [true];
  try {
    const { rows } = await query(queryText, values);
    return rows;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


module.exports = {
  signin, signup, findUser, allAdmins, createAdmin,
};
