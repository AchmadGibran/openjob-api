const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const generateId = require('../utils/id');
const { InvariantError, NotFoundError, AuthenticationError } = require('../utils/errors');

const addUser = async ({
  name, email, password, role = 'jobseeker',
}) => {
  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rowCount) throw new InvariantError('Email sudah digunakan');

  const id = generateId('user');
  const hashed = await bcrypt.hash(password, 10);

  const { rows } = await pool.query(
    'INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [id, name, email, hashed, role],
  );
  return rows[0].id;
};

const getUserById = async (id) => {
  const { rows } = await pool.query(
    'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
    [id],
  );
  if (!rows.length) throw new NotFoundError('User tidak ditemukan');
  return rows[0];
};

const verifyCredential = async (email, password) => {
  const { rows } = await pool.query('SELECT id, password FROM users WHERE email = $1', [email]);
  if (!rows.length) throw new AuthenticationError('Kredensial yang Anda berikan salah');

  const match = await bcrypt.compare(password, rows[0].password);
  if (!match) throw new AuthenticationError('Kredensial yang Anda berikan salah');

  return rows[0].id;
};

module.exports = { addUser, getUserById, verifyCredential };
