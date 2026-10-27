const pool = require('../config/database');
const generateId = require('../utils/id');
const { NotFoundError, ConflictError } = require('../utils/errors');
const { getJobById } = require('./jobsService');

const addBookmark = async (userId, jobId) => {
  await getJobById(jobId);

  const existing = await pool.query(
    'SELECT id FROM bookmarks WHERE user_id = $1 AND job_id = $2',
    [userId, jobId],
  );
  if (existing.rowCount) throw new ConflictError('Job sudah di-bookmark');

  const id = generateId('bookmark');
  const { rows } = await pool.query(
    'INSERT INTO bookmarks (id, user_id, job_id) VALUES ($1, $2, $3) RETURNING id',
    [id, userId, jobId],
  );
  return rows[0].id;
};

const getBookmarkById = async (id, jobId, userId) => {
  const { rows } = await pool.query(
    `SELECT b.id, b.user_id, b.job_id, b.created_at, j.title AS job_title
     FROM bookmarks b JOIN jobs j ON j.id = b.job_id
     WHERE b.id = $1 AND b.job_id = $2 AND b.user_id = $3`,
    [id, jobId, userId],
  );
  if (!rows.length) throw new NotFoundError('Bookmark tidak ditemukan');
  return rows[0];
};

const getBookmarksByUserId = async (userId) => {
  const { rows } = await pool.query(
    `SELECT b.id, b.user_id, b.job_id, b.created_at,
            j.title AS job_title, c.name AS company_name
     FROM bookmarks b
     JOIN jobs j ON j.id = b.job_id
     JOIN companies c ON c.id = j.company_id
     WHERE b.user_id = $1
     ORDER BY b.created_at DESC`,
    [userId],
  );
  return rows;
};

const deleteBookmarkByUserAndJob = async (userId, jobId) => {
  const { rows } = await pool.query(
    'DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2 RETURNING id',
    [userId, jobId],
  );
  if (!rows.length) throw new NotFoundError('Bookmark tidak ditemukan');
};

module.exports = {
  addBookmark, getBookmarkById, getBookmarksByUserId, deleteBookmarkByUserAndJob,
};
