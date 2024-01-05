const { Pool } = require('pg');

const pool = new Pool({
  user: '',
  password: '',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'registration'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};