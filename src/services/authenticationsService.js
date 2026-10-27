const pool = require('../config/database');
const { InvariantError } = require('../utils/errors');

const addRefreshToken = async (token) => {
  await pool.query('INSERT INTO authentications (token) VALUES ($1)', [token]);
};

const verifyRefreshToken = async (token) => {
  const { rowCount } = await pool.query('SELECT token FROM authentications WHERE token = $1', [token]);
  if (!rowCount) throw new InvariantError('Refresh token tidak valid');
};

const deleteRefreshToken = async (token) => {
  await pool.query('DELETE FROM authentications WHERE token = $1', [token]);
};

module.exports = { addRefreshToken, verifyRefreshToken, deleteRefreshToken };
