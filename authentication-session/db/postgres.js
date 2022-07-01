const { Pool } = require('pg');

const user = process.env.PGUSER;
const host = process.env.PGHOST;
const db = process.env.PGDATABASE;
const password = process.env.PGPASSWORD;
const port = process.env.PGPORT;

const connectionString = `postgresql://${user}:${password}@${host}:${port}/${db}`;

const pool = new Pool({
    connectionString,
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
};
