const pool = require('../config/database');
const generateId = require('../utils/id');
const { NotFoundError } = require('../utils/errors');

const addCategory = async ({ name }) => {
  const id = generateId('category');
  const { rows } = await pool.query(
    'INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING id',
    [id, name],
  );
  return rows[0].id;
};

const getCategories = async () => {
  const { rows } = await pool.query('SELECT * FROM categories ORDER BY created_at DESC');
  return rows;
};

const getCategoryById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  if (!rows.length) throw new NotFoundError('Category tidak ditemukan');
  return rows[0];
};

const editCategoryById = async (id, { name }) => {
  const { rows } = await pool.query(
    'UPDATE categories SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING id',
    [name, id],
  );
  if (!rows.length) throw new NotFoundError('Gagal memperbarui category. Id tidak ditemukan');
};

const deleteCategoryById = async (id) => {
  const { rows } = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING id', [id]);
  if (!rows.length) throw new NotFoundError('Gagal menghapus category. Id tidak ditemukan');
};

module.exports = {
  addCategory, getCategories, getCategoryById, editCategoryById, deleteCategoryById,
};
