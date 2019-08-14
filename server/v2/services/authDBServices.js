import bcrypt from 'bcrypt';
import query from './pool';

async function findUserById(id) {
  const queryText = 'SELECT * From users WHERE id = $1';
  const values = [id];
  try {
    const { rows } = await query(queryText, values);
    return rows[0];
  } catch (error) {
    console.log(`Database ${error}`);
  }
}
async function findUser(email) {
  const queryText = 'SELECT * From users WHERE email = $1';
  const values = [email];
  try {
    const { rows } = await query(queryText, values);
    return rows.length;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}

async function signin(email, password) {
  const queryText = 'SELECT * From users WHERE email = $1';
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
  const queryText = 'INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
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
  const queryText = 'INSERT INTO users(first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [first_name, last_name, email, password, true];
  try {
    const { rows } = await query(queryText, values);
    return rows[0];
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


async function allAdmins() {
  const queryText = 'SELECT * From users WHERE is_admin = $1';
  const values = [true];
  try {
    const { rows } = await query(queryText, values);
    return rows;
  } catch (error) {
    console.log(`Database ${error}`);
  }
}


module.exports = {
  signin, signup, findUser, findUserById, allAdmins, createAdmin,
};
