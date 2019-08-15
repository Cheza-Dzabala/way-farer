import query from '../../services/pool';
import queries from '../../helpers/queries';

export default async function dropTables() {
  const dropTable = queries.dopTables.allTables;
  await query(dropTable);
}
