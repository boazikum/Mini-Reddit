const { Client } = require('pg');

async function useDb(query, queryParameters=[]) {
  const client = new Client({
    connectionString: "postgresql://postgres:postgres@localhost:5432/minireddit?schema=public"
  });

  let results = [];

  try {
    await client.connect();
    const res = await client.query(query, queryParameters);
    results = res.rows;
  } catch (err) {
    await client.end();
    throw new Error(err);
  }

  await client.end();
  return results;
}

const queryDb = (query, queryParameters = []) => {
    return useDb(query, queryParameters)
    .then(results => {
        return results
    })
}

module.exports = queryDb;
