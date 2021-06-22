const { Router } = require('express');
const { getAllTypes } = require('../controllers/type');
const router = Router();

router.get('/', getAllTypes);



module.exports = router;