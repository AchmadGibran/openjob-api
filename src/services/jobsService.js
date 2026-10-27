const pool = require('../config/database');
const generateId = require('../utils/id');
const { NotFoundError } = require('../utils/errors');
const { getCompanyById } = require('./companiesService');
const { getCategoryById } = require('./categoriesService');

const SELECT_JOBS = `
  SELECT j.id, j.company_id, j.category_id, j.title, j.description, j.job_type,
         j.experience_level, j.location_type, j.location_city, j.salary_min,
         j.salary_max, j.is_salary_visible, j.status, j.created_at, j.updated_at,
         c.name AS company_name, cat.name AS category_name
  FROM jobs j
  JOIN companies c ON c.id = j.company_id
  JOIN categories cat ON cat.id = j.category_id`;

const addJob = async (payload) => {
  await getCompanyById(payload.company_id);
  await getCategoryById(payload.category_id);

  const id = generateId('job');
  const { rows } = await pool.query(
    `INSERT INTO jobs (id, company_id, category_id, title, description, job_type,
       experience_level, location_type, location_city, salary_min, salary_max,
       is_salary_visible, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id`,
    [
      id, payload.company_id, payload.category_id, payload.title, payload.description,
      payload.job_type ?? null, payload.experience_level ?? null,
      payload.location_type ?? null, payload.location_city ?? null,
      payload.salary_min ?? null, payload.salary_max ?? null,
      payload.is_salary_visible ?? true, payload.status ?? 'open',
    ],
  );
  return rows[0].id;
};

// Mendukung pencarian: ?title= dan ?company-name=
const getJobs = async ({ title, companyName } = {}) => {
  const { rows } = await pool.query(
    `${SELECT_JOBS}
     WHERE ($1::text IS NULL OR j.title ILIKE '%' || $1::text || '%')
       AND ($2::text IS NULL OR c.name ILIKE '%' || $2::text || '%')
     ORDER BY j.created_at DESC`,
    [title || null, companyName || null],
  );
  return rows;
};

const getJobById = async (id) => {
  const { rows } = await pool.query(`${SELECT_JOBS} WHERE j.id = $1`, [id]);
  if (!rows.length) throw new NotFoundError('Job tidak ditemukan');
  return rows[0];
};

const getJobsByCompanyId = async (companyId) => {
  const { rows } = await pool.query(
    `${SELECT_JOBS} WHERE j.company_id = $1 ORDER BY j.created_at DESC`,
    [companyId],
  );
  return rows;
};

const getJobsByCategoryId = async (categoryId) => {
  const { rows } = await pool.query(
    `${SELECT_JOBS} WHERE j.category_id = $1 ORDER BY j.created_at DESC`,
    [categoryId],
  );
  return rows;
};

const editJobById = async (id, payload) => {
  await getCompanyById(payload.company_id);
  await getCategoryById(payload.category_id);

  const { rows } = await pool.query(
    `UPDATE jobs SET company_id=$1, category_id=$2, title=$3, description=$4,
       job_type=$5, experience_level=$6, location_type=$7, location_city=$8,
       salary_min=$9, salary_max=$10, is_salary_visible=$11, status=$12,
       updated_at=NOW()
     WHERE id=$13 RETURNING id`,
    [
      payload.company_id, payload.category_id, payload.title, payload.description,
      payload.job_type ?? null, payload.experience_level ?? null,
      payload.location_type ?? null, payload.location_city ?? null,
      payload.salary_min ?? null, payload.salary_max ?? null,
      payload.is_salary_visible ?? true, payload.status ?? 'open', id,
    ],
  );
  if (!rows.length) throw new NotFoundError('Gagal memperbarui job. Id tidak ditemukan');
};

const deleteJobById = async (id) => {
  const { rows } = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING id', [id]);
  if (!rows.length) throw new NotFoundError('Gagal menghapus job. Id tidak ditemukan');
};

module.exports = {
  addJob,
  getJobs,
  getJobById,
  getJobsByCompanyId,
  getJobsByCategoryId,
  editJobById,
  deleteJobById,
};
