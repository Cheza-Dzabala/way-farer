import query from '../services/pool';

export default async function (queryText, queryValue) {
  const { rows } = await query(queryText, queryValue);
  return rows[0];
}
