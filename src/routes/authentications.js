const { Router } = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { loginPayload, refreshTokenPayload } = require('../validators');
const c = require('../controllers/authenticationsController');

const router = Router();

router.post('/', validate(loginPayload), c.postAuthentication);
router.put('/', validate(refreshTokenPayload), c.putAuthentication);
router.delete('/', auth, validate(refreshTokenPayload), c.deleteAuthentication);

module.exports = router;