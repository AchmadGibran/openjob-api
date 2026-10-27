const { ClientError } = require('../utils/errors');

const notFoundHandler = (req, res) => {
  res.status(404).json({ status: 'failed', message: 'Route tidak ditemukan' });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({ status: 'failed', message: err.message });
  }

  // JSON body tidak valid
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ status: 'failed', message: 'Body request bukan JSON yang valid' });
  }

  // PostgreSQL: unique violation
  if (err.code === '23505') {
    return res.status(409).json({ status: 'failed', message: 'Data sudah ada' });
  }

  // PostgreSQL: foreign key violation
  if (err.code === '23503') {
    return res.status(400).json({ status: 'failed', message: 'Referensi data tidak valid' });
  }

  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Terjadi kegagalan pada server kami',
  });
};

module.exports = { notFoundHandler, errorHandler };
