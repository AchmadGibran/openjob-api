const { Pool } = require('pg');

// Kredensial dibaca otomatis dari env: PGUSER, PGPASSWORD, PGDATABASE, PGHOST, PGPORT
const pool = new Pool();

module.exports = pool;
