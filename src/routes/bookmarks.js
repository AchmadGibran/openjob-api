const { Router } = require('express');
const auth = require('../middlewares/auth');
const c = require('../controllers/bookmarksController');

const router = Router();

router.get('/', auth, c.getBookmarks);

module.exports = router;
