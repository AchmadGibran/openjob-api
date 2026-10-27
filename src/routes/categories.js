const { Router } = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { categoryPayload } = require('../validators');
const c = require('../controllers/categoriesController');

const router = Router();

router.get('/', c.getCategories);
router.get('/:id', c.getCategoryById);
router.post('/', auth, validate(categoryPayload), c.postCategory);
router.put('/:id', auth, validate(categoryPayload), c.putCategoryById);
router.delete('/:id', auth, c.deleteCategoryById);

module.exports = router;
