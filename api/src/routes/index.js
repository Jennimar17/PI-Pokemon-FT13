const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const PokemonRoutes = require('./pokemon.js');
const TypeRoutes = require('./type.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemon', PokemonRoutes);
router.use('/type', TypeRoutes);


module.exports = router;
