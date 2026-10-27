const { Router } = require('express');
const validate = require('../middlewares/validate');
const { userPayload } = require('../validators');
const c = require('../controllers/usersController');

const router = Router();

router.post('/', validate(userPayload), c.postUser);
router.get('/:id', c.getUserById);

module.exports = router;
