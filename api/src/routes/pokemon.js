const { Router } = require('express');
const { getAllPokemons, addPokemon } = require('../controllers/pokemon');
const router = Router();

router.get('/', getAllPokemons);
router.post('/', addPokemon);

module.exports = router;