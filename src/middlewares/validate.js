const { InvariantError } = require('../utils/errors');

// Middleware validasi data dengan Joi
// source: 'body' | 'query' | 'params'
const validate = (schema, source = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[source] ?? {}, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw new InvariantError(error.details.map((d) => d.message).join(', '));
  }

  // req.query bersifat read-only di Express 5, jadi hanya body yang ditimpa
  if (source === 'body') req.body = value;
  next();
};

module.exports = validate;
