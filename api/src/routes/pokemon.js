const { Router } = require('express');

const router = Router();

router.get('/', (request, response) => {
    response.send('holaaa soy un pokemon');
});

module.exports = router;