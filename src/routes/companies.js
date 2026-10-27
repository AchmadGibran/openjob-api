const { Router } = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { companyPayload, companyUpdatePayload } = require('../validators');
const c = require('../controllers/companiesController');

const router = Router();

router.get('/', c.getCompanies);
router.get('/:id', c.getCompanyById);
router.post('/', auth, validate(companyPayload), c.postCompany);
router.put('/:id', auth, validate(companyUpdatePayload), c.putCompanyById);
router.delete('/:id', auth, c.deleteCompanyById);

module.exports = router;
