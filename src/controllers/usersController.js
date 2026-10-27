const usersService = require('../services/usersService');

const postUser = async (req, res) => {
  const id = await usersService.addUser(req.body);
  res.status(201).json({
    status: 'success',
    message: 'User berhasil didaftarkan',
    data: { id },
  });
};

const getUserById = async (req, res) => {
  const user = await usersService.getUserById(req.params.id);
  res.json({ status: 'success', data: user });
};

module.exports = { postUser, getUserById };
