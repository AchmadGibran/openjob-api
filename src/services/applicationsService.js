const pool = require('../config/database');
const generateId = require('../utils/id');
const { NotFoundError } = require('../utils/errors');
const { getJobById } = require('./jobsService');

const SELECT_APPLICATIONS = `
  SELECT a.id, a.user_id, a.job_id, a.cover_letter, a.status, a.created_at, a.updated_at,
         j.title AS job_title
  FROM applications a
  JOIN jobs j ON j.id = a.job_id`;

const addApplication = async (userId, { job_id: jobId, cover_letter: coverLetter, status }) => {
  await getJobById(jobId);

  const id = generateId('application');
  const { rows } = await pool.query(
    `INSERT INTO applications (id, user_id, job_id, cover_letter, status)
     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [id, userId, jobId, coverLetter ?? null, status ?? 'pending'],
  );
  return rows[0].id;
};

const getApplications = async () => {
  const { rows } = await pool.query(`${SELECT_APPLICATIONS} ORDER BY a.created_at DESC`);
  return rows;
};

const getApplicationById = async (id) => {
  const { rows } = await pool.query(`${SELECT_APPLICATIONS} WHERE a.id = $1`, [id]);
  if (!rows.length) throw new NotFoundError('Application tidak ditemukan');
  return rows[0];
};

const getApplicationsByUserId = async (userId) => {
  const { rows } = await pool.query(
    `${SELECT_APPLICATIONS} WHERE a.user_id = $1 ORDER BY a.created_at DESC`,
    [userId],
  );
  return rows;
};

const getApplicationsByJobId = async (jobId) => {
  const { rows } = await pool.query(
    `${SELECT_APPLICATIONS} WHERE a.job_id = $1 ORDER BY a.created_at DESC`,
    [jobId],
  );
  return rows;
};

const editApplicationStatusById = async (id, status) => {
  const { rows } = await pool.query(
    'UPDATE applications SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING id',
    [status, id],
  );
  if (!rows.length) throw new NotFoundError('Gagal memperbarui application. Id tidak ditemukan');
};

const deleteApplicationById = async (id) => {
  const { rows } = await pool.query('DELETE FROM applications WHERE id = $1 RETURNING id', [id]);
  if (!rows.length) throw new NotFoundError('Gagal menghapus application. Id tidak ditemukan');
};

module.exports = {
  addApplication,
  getApplications,
  getApplicationById,
  getApplicationsByUserId,
  getApplicationsByJobId,
  editApplicationStatusById,
  deleteApplicationById,
};
