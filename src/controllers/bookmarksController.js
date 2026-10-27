const service = require('../services/bookmarksService');

const postBookmark = async (req, res) => {
  const id = await service.addBookmark(req.user.id, req.params.jobId);
  res.status(201).json({ status: 'success', message: 'Bookmark berhasil ditambahkan', data: { id } });
};

const getBookmarkById = async (req, res) => {
  const { jobId, id } = req.params;
  const bookmark = await service.getBookmarkById(id, jobId, req.user.id);
  res.json({ status: 'success', data: bookmark });
};

const deleteBookmark = async (req, res) => {
  await service.deleteBookmarkByUserAndJob(req.user.id, req.params.jobId);
  res.json({ status: 'success', message: 'Bookmark berhasil dihapus' });
};

const getBookmarks = async (req, res) => {
  const bookmarks = await service.getBookmarksByUserId(req.user.id);
  res.json({ status: 'success', data: { bookmarks } });
};

module.exports = {
  postBookmark, getBookmarkById, deleteBookmark, getBookmarks,
};
