const jwt = require('jsonwebtoken');
const { InvariantError, AuthenticationError } = require('./errors');

const ACCESS_TOKEN_AGE = '3h'; // masa berlaku access token: 3 jam
const REFRESH_TOKEN_AGE = '7d';

const TokenManager = {
  generateAccessToken: (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: ACCESS_TOKEN_AGE,
  }),

  generateRefreshToken: (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: REFRESH_TOKEN_AGE,
  }),

  verifyAccessToken: (token) => {
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    } catch (error) {
      throw new AuthenticationError('Access token tidak valid atau sudah kedaluwarsa');
    }
  },

  verifyRefreshToken: (token) => {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;
