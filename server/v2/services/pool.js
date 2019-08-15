import { Pool } from 'pg';
import config from './config';

const pool = new Pool(config);
async function query(executableQuery, values = null) {
  const client = await pool.connect();
  let res;
  try {
    await client.query('BEGIN');
    try {
      res = await client.query(executableQuery, values);
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
  } finally {
    client.release();
  }
  return res;
}

module.exports = query;
