const { Router } = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { applicationPayload, applicationStatusPayload } = require('../validators');
const c = require('../controllers/applicationsController');

const router = Router();

// Semua endpoint applications bersifat PROTECTED
router.use(auth);

router.post('/', validate(applicationPayload), c.postApplication);
router.get('/', c.getApplications);
router.get('/user/:userId', c.getApplicationsByUser);
router.get('/job/:jobId', c.getApplicationsByJob);
router.get('/:id', c.getApplicationById);
router.put('/:id', validate(applicationStatusPayload), c.putApplicationById);
router.delete('/:id', c.deleteApplicationById);

module.exports = router;
