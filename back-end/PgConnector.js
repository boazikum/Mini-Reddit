const { Client } = require('pg');

async function useDb(query, queryParameters=[]) {
  const client = new Client({
    connectionString: "postgresql://postgres:postgres@localhost:5432/minireddit?schema=public"
  });

  let results = [];

  try {
    //console.log("before connect");
    await client.connect();
    //console.log("after connect");
    const res = await client.query(query, queryParameters);
    results = res.rows;
    //console.log("connected, results:", results);
  } catch (err) {
    console.error(err);
  }
  await client.end();
  return results;
}

const queryDb = (query, queryParameters = []) => {
    return useDb(query, queryParameters)
    .then(results => {
        return results
    }).catch(err => {
        console.log(err)
        return []
    })
}

module.exports = queryDb;
