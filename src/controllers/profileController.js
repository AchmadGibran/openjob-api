const usersService = require('../services/usersService');
const applicationsService = require('../services/applicationsService');
const bookmarksService = require('../services/bookmarksService');

const getProfile = async (req, res) => {
  const user = await usersService.getUserById(req.user.id);
  res.json({ status: 'success', data: user });
};

const getProfileApplications = async (req, res) => {
  const applications = await applicationsService.getApplicationsByUserId(req.user.id);
  res.json({ status: 'success', data: { applications } });
};

const getProfileBookmarks = async (req, res) => {
  const bookmarks = await bookmarksService.getBookmarksByUserId(req.user.id);
  res.json({ status: 'success', data: { bookmarks } });
};

module.exports = { getProfile, getProfileApplications, getProfileBookmarks };
