const usersService = require('../services/usersService');
const authService = require('../services/authenticationsService');
const TokenManager = require('../utils/tokenManager');

const postAuthentication = async (req, res) => {
  const { email, password } = req.body;
  const id = await usersService.verifyCredential(email, password);

  const accessToken = TokenManager.generateAccessToken({ id });
  const refreshToken = TokenManager.generateRefreshToken({ id });
  await authService.addRefreshToken(refreshToken);

  res.status(200).json({
    status: 'success',
    message: 'Authentication berhasil ditambahkan',
    data: { accessToken, refreshToken },
  });
};

const putAuthentication = async (req, res) => {
  const { refreshToken } = req.body;
  const { id } = TokenManager.verifyRefreshToken(refreshToken);
  await authService.verifyRefreshToken(refreshToken);

  const accessToken = TokenManager.generateAccessToken({ id });
  res.json({
    status: 'success',
    message: 'Access token berhasil diperbarui',
    data: { accessToken },
  });
};

const deleteAuthentication = async (req, res) => {
  const { refreshToken } = req.body;
  await authService.verifyRefreshToken(refreshToken);
  await authService.deleteRefreshToken(refreshToken);

  res.json({ status: 'success', message: 'Refresh token berhasil dihapus' });
};

module.exports = { postAuthentication, putAuthentication, deleteAuthentication };
