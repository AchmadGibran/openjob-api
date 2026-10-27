const { Router } = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { jobPayload, jobQuery } = require('../validators');
const c = require('../controllers/jobsController');
const bookmarks = require('../controllers/bookmarksController');

const router = Router();

// PUBLIC
router.get('/', validate(jobQuery, 'query'), c.getJobs); // ?title= & ?company-name=
router.get('/company/:companyId', c.getJobsByCompany);
router.get('/category/:categoryId', c.getJobsByCategory);
router.get('/:id', c.getJobById);

// PROTECTED
router.post('/', auth, validate(jobPayload), c.postJob);
router.put('/:id', auth, validate(jobPayload), c.putJobById);
router.delete('/:id', auth, c.deleteJobById);

// BOOKMARKS (pattern /jobs/:jobId/bookmark) - PROTECTED
router.post('/:jobId/bookmark', auth, bookmarks.postBookmark);
router.get('/:jobId/bookmark/:id', auth, bookmarks.getBookmarkById);
router.delete('/:jobId/bookmark', auth, bookmarks.deleteBookmark);

module.exports = router;
