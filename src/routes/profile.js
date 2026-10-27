const { Router } = require('express');
const auth = require('../middlewares/auth');
const c = require('../controllers/profileController');

const router = Router();

router.use(auth);

router.get('/', c.getProfile);
router.get('/applications', c.getProfileApplications);
router.get('/bookmarks', c.getProfileBookmarks);

module.exports = router;
