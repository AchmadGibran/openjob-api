const pool = require('../config/database');
const generateId = require('../utils/id');
const { NotFoundError } = require('../utils/errors');

const addCompany = async ({ name, location, description }) => {
  const id = generateId('company');
  const { rows } = await pool.query(
    'INSERT INTO companies (id, name, location, description) VALUES ($1, $2, $3, $4) RETURNING id',
    [id, name, location ?? null, description ?? null],
  );
  return rows[0].id;
};

const getCompanies = async () => {
  const { rows } = await pool.query('SELECT * FROM companies ORDER BY created_at DESC');
  return rows;
};

const getCompanyById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);
  if (!rows.length) throw new NotFoundError('Company tidak ditemukan');
  return rows[0];
};

const editCompanyById = async (id, { name, location, description }) => {
  const { rows } = await pool.query(
    `UPDATE companies
     SET name = COALESCE($1, name), location = COALESCE($2, location),
         description = COALESCE($3, description), updated_at = NOW()
     WHERE id = $4 RETURNING id`,
    [name ?? null, location ?? null, description ?? null, id],
  );
  if (!rows.length) throw new NotFoundError('Gagal memperbarui company. Id tidak ditemukan');
};

const deleteCompanyById = async (id) => {
  const { rows } = await pool.query('DELETE FROM companies WHERE id = $1 RETURNING id', [id]);
  if (!rows.length) throw new NotFoundError('Gagal menghapus company. Id tidak ditemukan');
};

module.exports = {
  addCompany, getCompanies, getCompanyById, editCompanyById, deleteCompanyById,
};
