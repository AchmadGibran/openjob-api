const TokenManager = require('../utils/tokenManager');
const { AuthenticationError } = require('../utils/errors');

// Middleware autentikasi: Authorization: Bearer <access_token>
const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    throw new AuthenticationError('Missing authentication');
  }

  const token = header.slice(7).trim();
  const payload = TokenManager.verifyAccessToken(token);

  req.user = { id: payload.id };
  next();
};

module.exports = auth;
