const pg = require('pg');
const url = require('url');

let config = {};

if (process.env.KUBE_DB_HOST) {
  config = {
    user: process.env.KUBE_DB_USER,
    password: process.env.KUBE_DB_PASSWORD,
    host: process.env.KUBE_DB_HOST,
    port: 5432,
    database: 'pgtest',
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
} else {
  config = {
    host: 'localhost', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    database: 'pgtest', // CHANGE THIS LINE! env var: PGDATABASE, this is likely the one thing you need to change to get up and running
    max: 20, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
}

// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
