const { Pokemon } = require("../db");
const axios = require("axios");
/* const { POKEMON_URL, TYPE_URL } = require("../../constants"); */
//traemos todas... ya esta e get

async function addPokemon(request, response, next) {
  const pokemon = request.body;

  try {
    const createdPokemon = await Pokemon.create(pokemon);
    return response.send(createdPokemon);
  } catch (error) {
    next(error);
  }
}

function getAllPokemons(request, response, next) {
  const pokemonApi = axios.get(`https://pokeapi.co/api/v2/pokemon`);
  const PokeType = Pokemon.findAll();
  Promise.all([pokemonApi, PokeType])
    .then((res) => {
      let [pokemonApiResponse, pokeTypeResponse] = res;
      return response.send(
        pokeTypeResponse.concat(pokemonApiResponse.data.results)
      );
    })
    .catch((err) => next(err));
}

module.exports = {
  getAllPokemons,
  addPokemon,
};
