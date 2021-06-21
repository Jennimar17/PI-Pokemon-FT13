const { Router } = require('express');
const { getAllTypes, addType } = require('../controllers/type');
const router = Router();

router.get('/', getAllTypes);
router.post('/', addType);

module.exports = router;